export default function InfoPage() {
  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">About Scopetok</h1>

      <p className="mb-4 text-gray-700">
        Scopetok is a educational video platform built with React and Next.js.
        You can browse videos, watch them, add new ones, and leave comments.
        This app is designed to demonstrate full-stack functionality including:
      </p>

      <ul className="list-disc list-inside mb-4 text-gray-700 space-y-1">
        <li>Video listing and playback</li>
        <li>User comments with live updates</li>
        <li>Adding new videos through a form</li>
      </ul>

      <p className="mb-4 text-gray-700">
        This project was built as part of a take-home assessment for Scope Labs.
        It uses:
      </p>

      <ul className="list-disc list-inside text-gray-700 space-y-1">
        <li>React</li>
        <li>Next.js App Router</li>
        <li>Tailwind CSS for styling</li>
        <li>Fetch API for backend interaction</li>
        <li>ReactPlayer for video playing</li>
      </ul>

      <p className="mt-6 text-gray-600">Thank you for your time! 🚀</p>
    </main>
  );
}
