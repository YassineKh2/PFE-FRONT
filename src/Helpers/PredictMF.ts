import * as tf from "@tensorflow/tfjs";

type MFData = [string, number];

export default async function PredictMF(data: MFData[]) {
  const navValues = data.map((d) => d[1]);

  // Normalize data (min-max scaling)
  const minNav = Math.min(...navValues);
  const maxNav = Math.max(...navValues);
  const normalizedData = navValues.map(
    (nav) => (nav - minNav) / (maxNav - minNav),
  );

  // Prepare training data
  const sequenceLength = 3;
  const xs = [];
  const ys = [];

  for (let i = 0; i < normalizedData.length - sequenceLength; i++) {
    xs.push(normalizedData.slice(i, i + sequenceLength));
    ys.push(normalizedData[i + sequenceLength]);
  }

  const xsTensor = tf.tensor2d(xs, [xs.length, sequenceLength]);
  const ysTensor = tf.tensor1d(ys);

  // Define the model
  const model = tf.sequential();

  model.add(
    tf.layers.dense({
      units: 32,
      activation: "relu",
      inputShape: [sequenceLength],
    }),
  );
  model.add(tf.layers.dense({ units: 8, activation: "relu" }));
  model.add(tf.layers.dense({ units: 1 }));

  model.compile({ optimizer: "adam", loss: "meanSquaredError" });

  // Train the model
  await model.fit(xsTensor, ysTensor, {
    epochs: 100,
    callbacks: {
      onEpochEnd: (epoch, logs) =>
        console.log(`Epoch ${epoch + 1}: Loss = ${logs?.loss}`),
    },
  });

  // Predict NAV for the next 30 days
  let lastSequence = normalizedData.slice(-sequenceLength);
  let predictedNAVs = [];

  for (let i = 0; i < 5; i++) {
    const inputTensor = tf.tensor2d([lastSequence], [1, sequenceLength]);
    const prediction = model.predict(inputTensor) as tf.Tensor;
    const predictedNav = prediction.dataSync()[0] * (maxNav - minNav) + minNav;

    predictedNAVs.push(predictedNav);
    lastSequence.push((predictedNav - minNav) / (maxNav - minNav));
    lastSequence.shift();
  }

  console.log("Predicted NAV for the next 30 days:", predictedNAVs);

  return predictedNAVs;
}
