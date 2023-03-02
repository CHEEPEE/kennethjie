const openai = require('openai');
const fs = require('fs');

// Replace YOUR_API_KEY with your actual OpenAI API key
const apiKey = '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';
const promptPath = 'pairs.json';
const modelName = 'text-davinci-002';

async function fineTune() {
  // Read prompt and completion pairs from file
  const pairs = JSON.parse(fs.readFileSync(promptPath));

  // Set up OpenAI API client
  const config = new openai.Configuration({apiKey});
  const client = new openai.OpenAIApi(config);



  // Create fine-tuning prompt
  const prompt = pairs.reduce((acc, pair) => {
    return `${acc}${pair.prompt}\n${pair.completion}\n`;
  }, '');

  // Set up fine-tuning parameters
  const fineTuneArgs = {
    model: modelName,
    prompt:'tell me about yourself',
    temperature: 0.5,
    max_tokens: 1000,
    frequency_penalty: 0.5,
    presence_penalty: 0.5,
    logprobs: 10
  };

  // Fine-tune the GPT-3 model
  const response = await client.createCompletion(fineTuneArgs);

  // Log the fine-tuning results
  console.log(prompt,response.data.choices);
}

fineTune();