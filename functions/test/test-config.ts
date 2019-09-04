import * as TestFunctions from 'firebase-functions-test';

const firebaseConfig = {
    databaseURL: "https://stripe-payments-93e7b.firebaseio.com",
    projectId: "stripe-payments-93e7b",
    storageBucket: "stripe-payments-93e7b.appspot.com",
}

const envConfig = { stripe: { secret: 'sk_test_9TeCZ25j0vTd08anOqF1kYK4' }};

const fun = TestFunctions(firebaseConfig, 'service-account.json')

fun.mockConfig(envConfig);

export { fun };