import Home from "@/pages/Home";

export default function page({ params }: { params: { id: string } }) {
  return <Home id={params.id} />;
}
