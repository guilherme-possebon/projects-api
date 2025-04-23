"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./data-source");
const user_route_1 = __importDefault(require("./routes/user.route"));
const debug_routes_1 = __importDefault(require("./routes/debug.routes"));
const note_routes_1 = __importDefault(require("./routes/note.routes"));
async function bootstrap() {
    await data_source_1.AppDataSource.initialize();
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use("/user", user_route_1.default);
    app.use("/note", note_routes_1.default);
    app.use("/debug", debug_routes_1.default);
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
}
bootstrap().catch(console.error);
