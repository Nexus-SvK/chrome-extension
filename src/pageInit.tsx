import React from "react";
import { createRoot } from "react-dom/client";
const init = (children: React.ReactNode) => {
	const root = document.createElement("div");
	document.body.append(root);

	const app = createRoot(root);

	app.render(children);
};

export default init;
