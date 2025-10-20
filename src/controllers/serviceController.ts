import * as serviceService from "@/services/serviceService";

export const getServices = async () => {
  const services = await serviceService.getAllServices();
  return Response.json(services);
};

export const postService = async (req: Request) => {
  const body = await req.json();
  const created = await serviceService.createService(body);
  return Response.json(created, { status: 201 });
};
