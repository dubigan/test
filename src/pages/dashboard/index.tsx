import React, { ChangeEvent, MouseEvent, useState, useEffect } from "react";
// import { useHistory } from 'react-router';
import Form from "../../components/lib/Form/Form";
import { Button } from "../../components/lib/Button/Button";
import Card from "../../components/lib/Card/Card";
import Alerts from "../../components/lib/alert/Alerts";
import { useAlerts } from "../../components/lib/alert/AlertContext";

type TWebsocket = {
    ws: WebSocket | null;
    status: string;
};

const Dashboard = () => {
    const [websocket, setWebsocket] = useState<TWebsocket>({
        ws: null,
        status: "disconnected",
    });

    const [uploadFile, setUploadFile] = useState<File | null>(null);
    const [clearDB, setClearDB] = useState(false);
    const [downloadFormat, setDownloadFormat] = useState("json");

    const context = useAlerts();

    const getDownloadUrl = () => {
        return `/api/download/`;
    };

    const setWebsocketStatus = (status: string) => {
        setWebsocket({ ...websocket, status: status });
    };

    const getWsUrl = () => {
        //console.log("getWsUrl protocol: ", window.location.protocol);

        const ws_scheme = window.location.protocol === "https:" ? "wss" : "ws";
        if (window.location.hostname.toLowerCase().indexOf("localhost") >= 0) {
            return `ws://` + window.location.hostname + ":3000/";
        }
        // heroku deploy
        const hostname = window.location.hostname.split(".");
        console.log("getWsUrl heroku: ", hostname);
        if (hostname[1] && hostname[1].toLowerCase().indexOf("heroku") >= 0) {
            hostname[0] = "pskov-ws";
            return `${ws_scheme}://` + hostname.join(".");
        }
        return "localhost";
    };

    const checkWebsocket = () => {
        const ws: WebSocket | null = websocket.ws;
        if (!ws || ws!.readyState === WebSocket.CLOSED) connectWebsocket(); //check if websocket instance is closed, if so call `connect` function.
    };

    const connectWebsocket = () => {
        let timeout = 250;
        //const self = this; // cache the this
        let connectInterval: NodeJS.Timeout;
        //const ws_scheme = window.location.protocol === "https:" ? "wss" : "ws";
        //const url = `ws://${this.getHostName()}:8080/`;
        const url = getWsUrl();
        console.log("connectWebsocket url: ", url);

        const ws = new WebSocket(url);
        ws.onopen = () => {
            timeout = 250; // reset timer to 250 on open of websocket connection
            clearTimeout(connectInterval);
            //console.log(`connected to ${url}`);
            setWebsocketStatus(`connected to ${url}`);
        };

        ws.onmessage = (evt) => {
            // listen to data sent from the websocket server
            const data: any = JSON.parse(evt.data);
            const messages: Array<any> = [];
            if (data) {
                //console.log('onmessage', data);

                messages.push(data);
                context.setAlerts({ messages });
            }
        };

        ws.onclose = () => {
            //console.log('disconnected');
            setWebsocketStatus("disconnected");
            // automatically try to reconnect on connection loss
            timeout *= 2; //increment retry interval
            connectInterval = global.setTimeout(checkWebsocket, Math.min(10000, timeout)); //call check function after timeout
        };

        ws.onerror = (e) => {
            console.log("websocket error", e);
            setWebsocketStatus(`websocket error: ${e}`);
        };
        setWebsocket({ ...websocket, ws: ws });
    };

    useEffect(() => {
        connectWebsocket();
    }, []);

    const selectFormat = (e: ChangeEvent<HTMLSelectElement>) => {
        setDownloadFormat(e.target.value);
    };

    const selectFileToUpload = (e: MouseEvent<HTMLButtonElement>) => {
        const input = document.createElement("input");
        input.type = "file";

        input.onchange = (e: any): any => {
            const file: File = e.target!.files[0];
            setUploadFile(file);
        };

        input.click();
    };

    const sendFile = (e: MouseEvent<HTMLButtonElement>) => {
        const reader = new FileReader();
        reader.readAsText(uploadFile!, "UTF-8");

        // here we tell the reader what to do when it's done reading...
        reader.onload = (readerEvent) => {
            const content = readerEvent.target!.result; // this is the content!
            const ws: any = websocket.ws;
            if (ws !== null) {
                ws.send(
                    JSON.stringify({
                        type: "utf8",
                        cleardb: clearDB,
                        content: content,
                    })
                );
            }
        };
    };

    const handleClearDB = () => {
        setClearDB(!clearDB);
    };

    return (
        <div>
            <Alerts />
            <Card>
                <Card.Header>
                    <Form.Label>Загрузка в DB</Form.Label>
                    <div className="col-12 text-left">Websocket status: {websocket.status}</div>
                </Card.Header>
                <Card.Body>
                    <Form.Group auxClassName="form__group_horiz">
                        <Form.Label auxClassName="form__label_upload">Очистить DB</Form.Label>
                        <Form.Control
                            type="check"
                            name="clearBD"
                            value={clearDB}
                            onChange={handleClearDB}
                            disabled={websocket.status === "disconnected"}
                        />
                    </Form.Group>
                    <Form.Group auxClassName="form__group_horiz">
                        <Form.Label auxClassName="form__label_upload">
                            Файл загрузки в DB
                        </Form.Label>
                        <Form.Control
                            auxClassName="form__text form__text_upload"
                            name="uploadFileName"
                            id="uploadFileName"
                            type="text"
                            value={(uploadFile as any)?.name}
                            readOnly
                        />
                        <Button
                            //variant="primary"
                            className="btn-primary"
                            onClick={selectFileToUpload}
                            disabled={websocket.status === "disconnected"}
                        >
                            ...
                        </Button>
                        <Button
                            //variant="primary"
                            className="btn-primary"
                            onClick={sendFile}
                            disabled={uploadFile === null}
                        >
                            Старт
                        </Button>
                    </Form.Group>
                </Card.Body>
            </Card>
            <hr />
            <Card>
                <Card.Header>
                    <Form.Label>Выгрузка DB</Form.Label>
                </Card.Header>
                <Card.Body>
                    <Form.Group auxClassName="form__group_horiz">
                        <Form.Label auxClassName="form__label_download">
                            Выберите формат сохраняемого файла
                        </Form.Label>
                        <Form.Select auxClassName="form__select_download" onChange={selectFormat}>
                            <option value="json">json</option>
                            {/* <option value="csv">csv</option> */}
                            {/* <option value="text">text/plain</option> */}
                        </Form.Select>
                        <form action={getDownloadUrl()} method="post">
                            <input type="hidden" name="format" value={downloadFormat} />
                            <Button type="submit" className="btn-primary">
                                Старт
                            </Button>
                        </form>
                    </Form.Group>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Dashboard;
