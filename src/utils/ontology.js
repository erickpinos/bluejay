import { client } from '@ont-dev/ontology-dapi';

client.registerClient({});

export async function getAccount() {
  try {
    return await client.api.asset.getAccount();
  } catch(e) {
    console.log('getAccount error', e);
  }
}

export async function getBalance(address) {
  try {
    return await client.api.network.getBalance({ address: address })
  } catch(e) {
    console.log('getBalance error', e);
  }
}
