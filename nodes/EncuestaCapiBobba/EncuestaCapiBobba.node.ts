import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  NodeOperationError,
  IRequestOptions,
} from 'n8n-workflow';

export class EncuestaCapiBobba implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Encuesta CapiBobba',
    name: 'encuestaCapiBobba',
    icon: 'file:encuestaCapiBobba.png',
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

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
      try {
        const fecha = this.getNodeParameter('fecha', i, '') as string;
        const phoneNumber = this.getNodeParameter('phoneNumber', i, '') as string;

        // Obtener credenciales
        let credentials;
        try {
          credentials = await this.getCredentials('whatsAppApi');
        } catch (error) {
          throw new NodeOperationError(
            this.getNode(),
            `Failed to get credentials: ${(error as Error).message}`,
          );
        }

        // Log para debug (temporal)
        console.log('Credentials object:', JSON.stringify(credentials, null, 2));

        const accessToken = credentials.accessToken as string;
        const phoneNumberId = credentials.phoneNumberId as string;

        // Validar que las credenciales existen y tienen los valores requeridos
        if (!accessToken || !phoneNumberId) {
          throw new NodeOperationError(
            this.getNode(),
            `WhatsApp API credentials are not configured correctly. AccessToken: ${accessToken ? 'SET' : 'MISSING'}, PhoneNumberId: ${phoneNumberId ? 'SET' : 'MISSING'}`,
          );
        }

        const body = `¡Hola! Soy CapiBot, de CapiBobba 💜.\n\nNoté que disfrutaste de un pedido con nosotros el ${fecha}. ¡Esperamos que te haya encantado!\n\nPara mejorar, ¿podrías calificar tu experiencia?\n\n💬 *Opcional*: Después de calificar, puedes enviarnos un comentario sobre tu experiencia. ¡Tu opinión es muy importante para nosotros!`;
        const button = 'Calificar ⭐';
        const sections = [{
          title: 'Tu calificación',
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

        const options: IRequestOptions = {
          method: 'POST',
          uri: `https://graph.facebook.com/v22.0/${phoneNumberId}/messages`,
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: data,
          json: true,
        };

        const responseData = await this.helpers.request(options);
        returnData.push({ json: responseData });
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ json: { error: (error as Error).message } });
          continue;
        }
        throw new NodeOperationError(this.getNode(), error as Error);
      }
    }

    return [returnData];
  }
}
