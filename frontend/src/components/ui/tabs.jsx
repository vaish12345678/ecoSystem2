import React, { useState } from "react";

export function Tabs({ children, defaultValue }) {
  const [activeTab, setActiveTab] = useState(defaultValue);
  return (
    <div>
      {React.Children.toArray(children).map((child) =>
        child.type === TabsList
          ? React.cloneElement(child, { activeTab, setActiveTab })
          : child.props.value === activeTab
          ? child
          : null
      )}
    </div>
  );
}

export function TabsList({ children, activeTab, setActiveTab }) {
  return (
    <div className="flex gap-2 border-b border-gray-300 mb-4">
      {React.Children.toArray(children).map((child) =>
        React.cloneElement(child, {
          isActive: child.props.value === activeTab,
          onClick: () => setActiveTab(child.props.value),
        })
      )}
    </div>
  );
}

export function TabsTrigger({ children, isActive, onClick }) {
  return (
    <button
      className={`px-4 py-2 border-b-2 ${
        isActive ? "border-green-600 text-green-600" : "border-transparent text-gray-500"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
