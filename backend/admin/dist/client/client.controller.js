"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const auth_guard_1 = require("../shared/auth.guard");
const client_dto_1 = require("./client.dto");
const validation_pipe_1 = require("../shared/validation.pipe");
const client_service_1 = require("./client.service");
const axios_1 = require("@nestjs/axios");
let ClientController = class ClientController {
    constructor(clientService, httpService, client) {
        this.clientService = clientService;
        this.httpService = httpService;
        this.client = client;
    }
    async all() {
        let allclients = this.clientService.all();
        return this.clientService.all();
    }
    async create(data) {
        console.log("data new client");
        console.log(data);
        const client = await this.clientService.create(data);
        this.client.emit('client_created', client);
        this.httpService.post(`http://localhost:3002/api/clients/add`, client).subscribe(res => {
            console.log("**************res");
            console.log(res);
        });
        return client;
    }
    async get(id) {
        console.log("*****id");
        console.log(id);
        return this.clientService.get(id);
    }
    async update(id, raison_social, num_sirette, adresse, email, telephone) {
        await this.clientService.update(id, { raison_social, num_sirette, adresse, email, telephone });
        const client = await this.clientService.get(id);
        this.client.emit('client_updated', client);
        this.httpService.put(`http://localhost:3002/api/clients/edit/${id}`, { raison_social, num_sirette, adresse, email, telephone }).subscribe(res => {
            console.log("**************res");
            console.log(res);
        });
        return client;
    }
    async delete(id) {
        console.log(" id to delete");
        console.log(id);
        await this.clientService.delete(id);
        this.client.emit('client_deleted', id);
        this.httpService.delete(`http://localhost:3002/api/clients/delete/${id}`).subscribe(res => {
            console.log("**************res");
            console.log(res);
        });
        return id;
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "all", null);
__decorate([
    (0, common_1.Post)('add'),
    (0, common_1.UsePipes)(new validation_pipe_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [client_dto_1.ClientDTO]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "get", null);
__decorate([
    (0, common_1.Put)('edit/:id'),
    (0, common_1.UsePipes)(new validation_pipe_1.ValidationPipe()),
    (0, common_1.UseGuards)(new auth_guard_1.AuthGuard()),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('raison_social')),
    __param(2, (0, common_1.Body)('num_sirette')),
    __param(3, (0, common_1.Body)('adresse')),
    __param(4, (0, common_1.Body)('email')),
    __param(5, (0, common_1.Body)('telephone')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    (0, common_1.UseGuards)(new auth_guard_1.AuthGuard()),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "delete", null);
ClientController = __decorate([
    (0, common_1.Controller)('clients'),
    __param(2, (0, common_1.Inject)('CLIENT_SERVICE')),
    __metadata("design:paramtypes", [client_service_1.ClientService, axios_1.HttpService,
        microservices_1.ClientProxy])
], ClientController);
exports.ClientController = ClientController;
//# sourceMappingURL=client.controller.js.map