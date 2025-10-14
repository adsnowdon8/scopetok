import NewVideoForm from "./components/newVideoForm";

export default function newVideo() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">New Video</h1>

      <NewVideoForm />
    </div>
  );
}
