export const InfoCard = ({
  icon: Icon,
  title,
  children,
  accentColor = "green",
}) => {
  const colors = {
    green: "border-green-500 bg-green-50",
    red: "border-red-500 bg-red-50",
    blue: "border-blue-500 bg-blue-50",
    purple: "border-purple-500 bg-purple-50",
    orange: "border-orange-500 bg-orange-50",
  };

  const iconColors = {
    green: "text-green-600 bg-green-100",
    red: "text-red-600 bg-red-100",
    blue: "text-blue-600 bg-blue-100",
    purple: "text-purple-600 bg-purple-100",
    orange: "text-orange-600 bg-orange-100",
  };

  return (
    <div
      className={`border-l-4 ${colors[accentColor]} dark:bg-subtle-dark mb-4 rounded-lg bg-white p-5 shadow-md`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`h-10 w-10 ${iconColors[accentColor]} flex flex-shrink-0 items-center justify-center rounded-lg`}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h3 className="mb-3 text-lg font-bold text-gray-800 dark:text-white">
            {title}
          </h3>
          <div className="dark:text-foreground-dark space-y-2 text-gray-700">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
