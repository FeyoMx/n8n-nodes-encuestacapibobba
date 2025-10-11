"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncuestaCapiBobba = void 0;
const n8n_workflow_1 = require("n8n-workflow");
class EncuestaCapiBobba {
    constructor() {
        this.description = {
            displayName: 'Encuesta CapiBobba',
            name: 'encuestaCapiBobba',
            group: ['transform'],
            version: 1,
            description: 'Sends a CapiBobba survey',
            defaults: {
                name: 'Encuesta CapiBobba',
            },
            inputs: ['main'],
            outputs: ['main'],
            credentials: [
                {
                    name: 'whatsAppApi',
                    required: true,
                },
            ],
            properties: [
                {
                    displayName: 'Fecha',
                    name: 'fecha',
                    type: 'string',
                    default: '',
                    placeholder: 'dd/mm/yyyy',
                    description: 'The date of the order',
                },
                {
                    displayName: 'Phone Number',
                    name: 'phoneNumber',
                    type: 'string',
                    default: '',
                    placeholder: '1234567890',
                    description: 'The phone number to send the message to',
                }
            ],
        };
    }
    async execute() {
        const items = this.getInputData();
        const returnData = [];
        for (let i = 0; i < items.length; i++) {
            try {
                const fecha = this.getNodeParameter('fecha', i, '');
                const phoneNumber = this.getNodeParameter('phoneNumber', i, '');
                const credentials = await this.getCredentials('whatsAppApi');
                const body = `¡Hola! Soy CapiBot, de CapiBobba 💜.\n\nNoté que disfrutaste de un pedido con nosotros el ${fecha}. ¡Esperamos que te haya encantado!\n\nPara mejorar, ¿podrías calificar tu experiencia?`;
                const button = 'Calificar ⭐';
                const sections = [{
                        title: 'Selecciona tu calificación',
                        rows: [
                            { id: 'rating_5', title: '⭐⭐⭐⭐⭐ Excelente (5)', description: '¡Todo fue perfecto!' },
                            { id: 'rating_4', title: '⭐⭐⭐⭐ Muy Bueno (4)', description: 'Me gustó mucho' },
                            { id: 'rating_3', title: '⭐⭐⭐ Bueno (3)', description: 'Estuvo bien' },
                            { id: 'rating_2', title: '⭐⭐ Regular (2)', description: 'Podría mejorar' },
                            { id: 'rating_1', title: '⭐ Malo (1)', description: 'No me gustó' }
                        ]
                    }];
                const data = {
                    messaging_product: 'whatsapp',
                    to: phoneNumber,
                    type: 'interactive',
                    interactive: {
                        type: 'list',
                        body: {
                            text: body,
                        },
                        action: {
                            button,
                            sections,
                        },
                    },
                };
                const options = {
                    method: 'POST',
                    uri: `https://graph.facebook.com/v15.0/${credentials.phoneNumberId}/messages`,
                    headers: {
                        Authorization: `Bearer ${credentials.accessToken}`,
                        'Content-Type': 'application/json',
                    },
                    body: data,
                    json: true,
                };
                const responseData = await this.helpers.request(options);
                returnData.push({ json: responseData });
            }
            catch (error) {
                if (this.continueOnFail()) {
                    returnData.push({ json: { error: error.message } });
                    continue;
                }
                throw new n8n_workflow_1.NodeOperationError(this.getNode(), error);
            }
        }
        return [returnData];
    }
}
exports.EncuestaCapiBobba = EncuestaCapiBobba;
//# sourceMappingURL=EncuestaCapiBobba.node.js.map