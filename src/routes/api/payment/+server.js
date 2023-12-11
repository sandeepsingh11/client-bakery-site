import { json } from '@sveltejs/kit';
import { Client, Environment } from 'square';
import { randomUUID } from 'crypto';

BigInt.prototype.toJSON = function () {
    return this.toString();
  };  

const { paymentsApi, ordersApi, checkoutApi } = new Client({
  accessToken: import.meta.env.VITE_SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox,
});

export async function POST({ request }) {
  const { locationId, sourceId } = await request.json();
  try {
    // const { result } = await paymentsApi.createPayment({
    //   locationId,
    //   sourceId,
    //   idempotencyKey: randomUUID(),
    //   amountMoney: {
    //     amount: 100,
    //     currency: 'USD',
    //   },
    // });

    // const { result } = await ordersApi.createOrder({
    //     order: {
    //         locationId,
    //         lineItems: [
    //             {
    //                 name: "Burger",
    //                 quantity: "1",
    //                 modifiers: [
    //                     {
    //                         name: "extra cheese",
    //                         quantity: "1",
    //                         basePriceMoney: {
    //                             amount: 50,
    //                             currency: "USD"
    //                         }
    //                     }
    //                 ],
    //                 basePriceMoney: {
    //                     amount: 1200,
    //                     currency: "USD"
    //                 }
    //             }
    //         ],
    //         fulfillments: [
    //             {
    //                 type: 'PICKUP',
    //                 state: 'PROPOSED',
    //                 pickupDetails: {
    //                     recipient: {
    //                         displayName: 'Jaiden Urie'
    //                     },
    //                     expiresAt: '2023-12-12T20:21:54.859Z',
    //                     autoCompleteDuration: 'P0DT1H0S',
    //                     scheduleType: 'SCHEDULED',
    //                     pickupAt: '2023-12-12T19:21:54.859Z',
    //                     note: 'Pour over coffee'
    //                 }
    //             }
    //         ]
    //     },
    //     idempotencyKey: randomUUID(),
    //     sourceId
    // })

    const { result } = await checkoutApi.createPaymentLink({
        idempotencyKey: randomUUID(),
        order: {
            locationId,
            lineItems: [
                {
                    name: "Burger",
                    quantity: "1",
                    modifiers: [
                        {
                            name: "extra cheese",
                            quantity: "1",
                            basePriceMoney: {
                                amount: 50,
                                currency: "USD"
                            }
                        }
                    ],
                    basePriceMoney: {
                        amount: 1200,
                        currency: "USD"
                    }
                }
            ],
            fulfillments: [
                {
                    type: 'PICKUP',
                    state: 'PROPOSED',
                    pickupDetails: {
                        recipient: {
                            displayName: 'Jaiden Urie'
                        },
                        expiresAt: '2023-12-12T20:21:54.859Z',
                        autoCompleteDuration: 'P0DT1H0S',
                        scheduleType: 'SCHEDULED',
                        pickupAt: '2023-12-12T19:21:54.859Z',
                        note: 'Pour over coffee'
                    }
                }
            ]
        }
    })

    // console.log(result.paymentLink);
    return json(result);
  } catch (error) {
    console.log(error);
  }
}
