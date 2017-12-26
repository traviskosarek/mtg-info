import * as Datastore from "@google-cloud/datastore";
import { Request, Response } from "express";

import { Set } from "./models";
import { ISet } from "./interfaces";

export class API {
    private static singleton: API;
    private projectId = "reaper-grames";

    private datastore: Datastore;

    private constructor() {
        // do nothing
    }

    public static instance(): API {
        if (this.singleton === undefined) {
            this.singleton = new this();
        }
        return this.singleton;
    }

    public putSet(request: Request, response: Response) {
        try {
            let set = request.body;
            let kind = "set";

            Set.validateJSON(set as ISet);

            this.datastore = Datastore({
                projectId: this.projectId
            });

            this.datastore
                .upsert({
                    key: this.datastore.key([kind, set.set_code]),
                    data: set
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

    public putSets(request: Request, response: Response) {
        try {
            let sets = request.body;
            if (sets instanceof Array && sets.length > 0) {
                let kind = "set";
                let validSets = [];

                sets.forEach((set) => {
                    Set.validateJSON(set as ISet);
                    validSets.push({
                        key: this.datastore.key([kind, set.set_code]),
                        data: set
                    });
                });

                this.datastore = Datastore({
                    projectId: this.projectId
                });

                this.datastore
                    .upsert(validSets)
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
            } else {
                response.status(400).json({
                    status: 400,
                    message: "Invalid payload format. Expecting an Array of JSON Objects."
                });
            }
        } catch (e) {
            response.status(400).json({
                status: 400,
                message: e.message
            });
        }
    }

    public getSet(request: Request, response: Response) {
        try {
            let set = request.body;
            let kind = "set";

            let set_code = set.set_code;

            Set.validateSetCode(set_code);

            this.datastore = Datastore({
                projectId: this.projectId
            });

            this.datastore
                .get(this.datastore.key([kind, set.set_code]))
                .then((results) => {
                    if (results[0] !== undefined) {
                        response.status(200).json({
                            status: 200,
                            message: "Success",
                            set: results[0]
                        });
                    } else {
                        response.status(400).json({
                            status: 400,
                            message: "Set not found. *** set = " + set_code
                        });
                    }
                })
                .catch((err) => {
                    response.status(500).json({
                        status: 500,
                        message: "Error retrieving set. Please try again later."
                    });
                });
        } catch (e) {
            response.status(400).json({
                status: 400,
                message: e.message
            });
        }
    }

    public getSets(request: Request, response: Response) {
        try {
            let set = request.body as ISet;
            let kind = "set";

            this.datastore = Datastore({
                projectId: this.projectId
            });

            let noFilters = true;
            let query = this.datastore.createQuery(kind);

            if (set.block_code !== undefined) {
                Set.validateBlockCode(set.block_code);
                query = query.filter("block_code", "=", set.block_code).order("block_code");
                noFilters = false;
            }
            if (set.block_name !== undefined) {
                Set.validateBlockName(set.block_name);
                query = query.filter("block_name", "=", set.block_name).order("block_name");
                noFilters = false;
            }
            if (set.card_count !== undefined) {
                Set.validateCardCount(set.card_count);
                query = query.filter("card_count", "=", set.card_count).order("card_count");
                noFilters = false;
            }
            if (set.icon_uri !== undefined) {
                Set.validateIconUri(set.icon_uri);
                query = query.filter("icon_uri", "=", set.icon_uri).order("icon_uri");
                noFilters = false;
            }
            if (set.is_digital !== undefined) {
                query = query.filter("is_digital", "=", set.is_digital).order("is_digital");
                noFilters = false;
            }
            if (set.is_foil !== undefined) {
                query = query.filter("is_foil", "=", set.is_foil).order("is_foil");
                noFilters = false;
            }
            if (set.parent_set_code !== undefined) {
                Set.validateParentSetCode(set.parent_set_code);
                query = query.filter("parent_set_code", "=", set.parent_set_code).order("parent_set_code");
                noFilters = false;
            }
            if (set.release_date !== undefined) {
                Set.validateReleaseDate(set.release_date);
                query = query.filter("release_date", "=", set.release_date).order("release_date");
                noFilters = false;
            }
            if (set.set_code !== undefined) {
                Set.validateSetCode(set.set_code);
                query = query.filter("set_code", "=", set.set_code).order("set_code");
                noFilters = false;
            }
            if (set.set_name !== undefined) {
                Set.validateSetName(set.set_name);
                query = query.filter("set_name", "=", set.set_name).order("set_name");
                noFilters = false;
            }
            if (set.set_type !== undefined) {
                Set.validateSetType(set.set_type);
                query = query.filter("set_type", "=", set.set_type).order("set_type");
                noFilters = false;
            }

            if (noFilters) {
                query = query.order("set_name");
            }

            this.datastore
                .runQuery(query)
                .then((results) => {
                    response.status(200).json({
                        status: 200,
                        message: "Success",
                        sets: results[0]
                    });
                })
                .catch((err) => {
                    response.status(500).json({
                        status: 500,
                        message: "Error retrieving sets. Please try again later. " + err
                    });
                });
        } catch (e) {
            response.status(400).json({
                status: 400,
                message: e.message
            });
        }
    }
}
