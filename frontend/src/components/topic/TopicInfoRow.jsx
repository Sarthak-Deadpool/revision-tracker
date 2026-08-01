function TopicInfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b px-5 py-4 last:border-b-0">
      <span className="text-sm text-slate-500">
        {label}
      </span>

      <span className="font-semibold text-slate-900">
        {value}
      </span>
    </div>
  );
}

export default TopicInfoRow;