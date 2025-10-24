export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public details?: any
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export const handleError = (error: unknown): Response => {
  console.error("API Error:", error);

  if (error instanceof ApiError) {
    return new Response(
      JSON.stringify({
        error: error.message,
        details: error.details,
      }),
      {
        status: error.statusCode,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  if (error && typeof error === "object" && "code" in error) {
    const prismaError = error as { code: string; meta?: any };

    switch (prismaError.code) {
      case "P2002":
        return new Response(
          JSON.stringify({
            error: "A record with this value already exists",
            field: prismaError.meta?.target,
          }),
          { status: 409, headers: { "Content-Type": "application/json" } }
        );
      case "P2025":
        return new Response(JSON.stringify({ error: "Record not found" }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
      case "P2003":
        return new Response(
          JSON.stringify({ error: "Foreign key constraint failed" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      default:
        return new Response(
          JSON.stringify({
            error: "Database error occurred",
            code: prismaError.code,
          }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
  }

  return new Response(
    JSON.stringify({
      error: "Internal server error",
      message: error instanceof Error ? error.message : "Unknown error",
    }),
    {
      status: 500,
      headers: { "Content-Type": "application/json" },
    }
  );
};

export const successResponse = (data: any, status: number = 200): Response => {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
};
