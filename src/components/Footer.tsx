export default function Footer() {
  return (
    <footer className="bg-[#2B5589] text-white py-8">
      <div className="container mx-auto px-6 text-center">
        <p>
          &copy; {new Date().getFullYear()} Total Quality. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
