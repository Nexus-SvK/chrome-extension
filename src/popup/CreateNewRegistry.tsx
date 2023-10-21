import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ChangeEvent, FormEvent, useState } from "react";
import * as crypto from 'crypto-js';
import { Input } from "./components/Input";

type props = {
    opened: boolean;
    onClose: () => void;
};

type formValue = {
    title: string;
    username: string;
    password: string;
    date?: string;
    url?: string;
}

const generateRandomIV = () => {
    return crypto.lib.WordArray.random(16).toString();
}

const encryptWithAES = (data: string, key: any, iv?: any): string => {
    const encrypted = crypto.AES.encrypt(data, key
        // , {
        //     iv: crypto.enc.Hex.parse(iv),
        //     mode: crypto.mode.CBC,
        //     padding: crypto.pad.Pkcs7,
        // }
    );

    return encrypted.toString();
}

// Decrypt using AES with CBC mode
const decryptWithAES = (encryptedData: string, key: any, iv?: any) => {
    try {
        const decrypted = crypto.AES.decrypt(encryptedData, key
            //     , {
            //     iv: crypto.enc.Hex.parse(iv),
            //     mode: crypto.mode.CBC,
            //     padding: crypto.pad.Pkcs7,
            // }
        );
        return decrypted.toString(crypto.enc.Utf8);
    } catch (error) {
        console.error('Error decrypting:', error);
        return '';
    }
}

export const CreateNewRegistry = ({ opened, onClose }: props) => {
    const [formData, setFormData] = useState<formValue>({
        title: "",
        username: "",
        password: ""
    });
    // const [decryptedData, setDecryptedData] = useState<any>(undefined);

    const onSubmitForm = (e: FormEvent) => {
        e.preventDefault();
        // const iv = crypto.enc.Base64.parse(generateRandomIV());
        const key = "Hollow Purple2020";
        // console.log(iv);
        const data = JSON.stringify(formData);
        // console.log(data);
        const cryptedObject = encryptWithAES(data, key);
        console.log(cryptedObject);
        const decryptedObject = decryptWithAES(cryptedObject, key);
        console.log(decryptedObject);
        if (decryptedObject === data) {
            chrome.storage.local.set({ ['kill_me']: JSON.parse(decryptedObject) }).then(() => console.log('done'));
            chrome.storage.local.get('kill_me').then((x) => console.log(x));
        }
    }

    const eventHandler = (e: ChangeEvent<any>, property: string) => {
        setFormData(p => { return { ...p, [property]: e.target.value } })
    }

    return (
        <div className={`create-menu ${opened ? "open" : ""}`}>
            <FontAwesomeIcon
                icon={faXmarkCircle}
                style={{
                    position: "absolute",
                    right: 17,
                    top: "6vh",
                    height: "5vh",
                }}
                onClick={onClose}
            />
            <h3>New Registry</h3>
            <form onSubmit={onSubmitForm} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <Input
                    inputName="Title"
                    value={formData.title}
                    onChange={(e) => eventHandler(e, 'title')}
                />
                <Input
                    inputName="Username"
                    value={formData.username}
                    onChange={(e) => eventHandler(e, 'username')}
                />
                <Input
                    inputName="Password"
                    value={formData.password}
                    onChange={(e) => eventHandler(e, 'password')}
                />
                <Input
                    inputName="Expiration date"
                    placeholder="Select date"
                    type="date"
                    value={formData.date ?? ''}
                    onChange={(e) => eventHandler(e, 'date')}
                />
                <Input
                    inputName="URL"
                    value={formData.url ?? ''}
                    onChange={(e) => eventHandler(e, 'url')}
                />
                <button type='submit'>Submit</button>
            </form>
            {/* <p>{decryptedData}</p> */}
        </div>
    );
};



// Encrypt using AES with CBC mode


// Hash using Argon2 (hypothetical)
// function hashWithArgon2(password: string, salt: string): string {
//     return 'hashedPassword'; // Replace with the actual hash
// }

// Example usage
const password = 'mypassword';
const key = 'myencryptionkey';
const iv = 'myiv';
// const salt = 'mysalt';

// Encrypt the password using AES
// const encryptedPassword = encryptWithAES(password, key, iv);
// console.log('Encrypted Password:', encryptedPassword);

// // Decrypt the encrypted password using AES
// const decryptedPassword = decryptWithAES(encryptedPassword, key, iv);
// console.log('Decrypted Password:', decryptedPassword);

// Hash the password using Argon2
// const hashedPassword = hashWithArgon2(password, salt);
// console.log('Hashed Password:', hashedPassword);

// Function to generate a random Initialization Vector (IV)


// Example usage
// const key = 'myencryptionkey';
// const plaintext = 'Hello, world!';

// Encrypt the plaintext using AES with a random IV

// Decrypt the encrypted data using the IV and the same key
