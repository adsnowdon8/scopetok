interface NavItemProps {
  icon: React.ReactNode;
  text: string;
  open: boolean;
  onClick: () => void;
}

export function NavItem({ icon, text, open, onClick }: NavItemProps) {
  return (
    <button
      className="flex items-center w-full gap-3 p-2 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
      onClick={onClick}
    >
      <span className="text-xl">{icon}</span>

      {open && <span className="text-base">{text}</span>}
    </button>
  );
}
