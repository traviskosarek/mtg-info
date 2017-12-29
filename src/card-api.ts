import * as Datastore from "@google-cloud/datastore";
import { Request, Response } from "express";

import { Card } from "./models";
import { ICard } from "./interfaces";

export class CardAPI {
    private static singleton: CardAPI;
    private projectId = "reaper-grames";
    private kind = "card";

    private datastore: Datastore;

    private constructor() {
        // do nothing
    }

    public static instance(): CardAPI {
        if (this.singleton === undefined) {
            this.singleton = new this();
        }
        return this.singleton;
    }

    public putCard(request: Request, response: Response) {
        try {

            let validCard = Card.createCard(request.body);
            
            this.datastore = Datastore({
                projectId: this.projectId
            });

            this.datastore
                .upsert({
                    key: this.datastore.key([this.kind, validCard.set_code]),
                    data: validCard
                })
                .then(() => {
                    response.status(200).json({
                        status: 200,
                        message: "Success"
                    });
                })
                .catch((err) => {
                    response.status(500).json({
                        status: 500,
                        message: "Save unsuccessful, please try again later"
                    });
                });
        } catch (e) {
            response.status(400).json({
                status: 400,
                message: e.message
            });
        }
    }

    public putCards(request: Request, response: Response) {
        //
    }

    public getCard(request: Request, response: Response) {
        //
    }

    public getCards(request: Request, response: Response) {
        //
    }
}
