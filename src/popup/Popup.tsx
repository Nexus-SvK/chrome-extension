import React, { useState } from "react";
import init from "../pageInit";
import "./popup.scss";
import { v4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faXmarkCircle,
    faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { CreateNewRegistry } from "./CreateNewRegistry";

const Popup = () => {
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const [createNewRegisty, setCreateNewRegistry] = useState(false);
    const { notifications: { create }, tts: { speak }, system: { cpu, display, memory, storage }, power: { requestKeepAwake }, printerProvider: { onPrintRequested }, storage: { local } } = chrome;

    const btn = () => {
        create(v4(), {
            // contextMessage: "Hello There",
            iconUrl: "brain.png",
            message: "This is message",
            type: "basic",
            title: "Hello There",
        });

    };
    //chrome.downloads.download({ url: 'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*', filename: 'dog.jpg', conflictAction: 'overwrite' });
    requestKeepAwake("system");
    speak("Hello there");
    cpu.getInfo().then((i) => console.log(i));
    display.getInfo().then((i) => console.log(i));
    storage.getInfo().then((i) => console.log(i));
    memory.getInfo().then((i) => console.log(i));
    return (
        <div style={{ backgroundColor: "blue", paddingInline: 10 }}>
            {/* <img
				src="https://buffer.com/library/content/images/2022/03/skitch--7-.png"
				style={{ borderRadius: "50vh" }}
				alt="Profile picture"
				width={"100vh"}
			/>
			<h3>Bibiana Frantisek</h3>
			<button onClick={btn}>Sign out</button> */}
            <div className="tab_navigation">
                <FontAwesomeIcon
                    icon={faBars}
                    style={{ height: "4.5vh" }}
                    onClick={() => setOpenMenu(true)}
                />
                <FontAwesomeIcon
                    icon={faPlus}
                    style={{ height: "4.5vh" }}
                    onClick={() => setCreateNewRegistry(true)}
                />
                <div className={`menu ${openMenu ? "open" : ""}`}>
                    <FontAwesomeIcon
                        icon={faXmarkCircle}
                        style={{
                            position: "absolute",
                            height: "5vh",
                            right: 0,
                        }}
                        onClick={() => setOpenMenu(false)}
                    />
                    <h3>Settings</h3>
                </div>
                <CreateNewRegistry
                    opened={createNewRegisty}
                    onClose={() => setCreateNewRegistry(false)}
                />
            </div>
        </div>
    );
};

init(<Popup />);
