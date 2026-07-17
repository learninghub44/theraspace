import Paystack from 'paystack-sdk'

const paystack = new Paystack(process.env.PAYSTACK_SECRET_KEY!)

export async function initializeSubscription(email: string, plan: string) {
  try {
    const response = await paystack.transaction.initialize({
      email,
      amount: 1000 * 100, // KES 1,000 in kobo
      plan,
      callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/paystack/callback`,
    })
    return response
  } catch (error) {
    console.error('Paystack initialization error:', error)
    throw error
  }
}

export async function verifyTransaction(reference: string) {
  try {
    const response = await paystack.transaction.verify(reference)
    return response
  } catch (error) {
    console.error('Paystack verification error:', error)
    throw error
  }
}

export async function createSubscription(customer: string, plan: string) {
  try {
    const response = await paystack.subscription.create({
      customer,
      plan,
    })
    return response
  } catch (error) {
    console.error('Paystack subscription error:', error)
    throw error
  }
}
