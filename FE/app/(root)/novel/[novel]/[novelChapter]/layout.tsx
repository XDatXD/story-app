import React from "react";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
    return <div className="min-h-screen">{children}</div>;
};

export default PublicLayout;
