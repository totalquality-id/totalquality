import ProtectedRoute from "@/components/ProtectedRoute";
import CareerApplicationForm from "@/components/CareerApplicationForm";

export default function ApplyPage() {
  return (
    <ProtectedRoute>
      <CareerApplicationForm />
    </ProtectedRoute>
  );
}
