import Home from "@/myPages/Home";

export default function page({ params }: { params: { id: string } }) {
  return <Home id={params.id} />;
}
