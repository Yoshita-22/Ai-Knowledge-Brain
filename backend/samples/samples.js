export const samples = [
  {
    "question": "what is transformer in ai?",
    "retrieved_contexts": [],
    "ground_truth_contexts": [
      "The Transformer is a model architecture based solely on attention mechanisms, dispensing with recurrence and convolutions entirely."
    ],
    "generated_answer": "",
    "ground_truth_answer": "A Transformer is a neural network architecture that relies entirely on attention mechanisms instead of recurrence or convolution.",
    "latency_ms": 0
  },
  {
    "question": "what is self attention?",
    "retrieved_contexts": [],
    "ground_truth_contexts": [
      "Self-attention is an attention mechanism relating different positions of a single sequence to compute a representation."
    ],
    "generated_answer": "",
    "ground_truth_answer": "Self-attention is a mechanism where each token attends to all other tokens in a sequence to capture relationships.",
    "latency_ms": 0
  },
  {
    "question": "how is transformer different from rnn?",
    "retrieved_contexts": [],
    "ground_truth_contexts": [
      "Recurrent models process sequences sequentially, while Transformer enables parallelization using attention."
    ],
    "generated_answer": "",
    "ground_truth_answer": "Transformers process sequences in parallel using attention, while RNNs process them sequentially.",
    "latency_ms": 0
  },
  {
    "question": "what is multi head attention in simple words?",
    "retrieved_contexts": [],
    "ground_truth_contexts": [
      "Multi-head attention allows the model to attend to information from different representation subspaces."
    ],
    "generated_answer": "",
    "ground_truth_answer": "Multi-head attention lets the model focus on different parts of the input simultaneously in multiple ways.",
    "latency_ms": 0
  },
  {
    "question": "what is positional encoding?",
    "retrieved_contexts": [],
    "ground_truth_contexts": [
      "Positional encodings inject information about the position of tokens in the sequence."
    ],
    "generated_answer": "",
    "ground_truth_answer": "Positional encoding provides information about the order of tokens since Transformers do not use recurrence.",
    "latency_ms": 0
  },
  {
    "question": "what is attention mechanism?",
    "retrieved_contexts": [],
    "ground_truth_contexts": [
      "Attention maps a query and key-value pairs to an output using weighted sums."
    ],
    "generated_answer": "",
    "ground_truth_answer": "An attention mechanism computes a weighted combination of values based on the relevance between queries and keys.",
    "latency_ms": 0
  },

  {
    "question": "why transformer removes recurrence completely?",
    "retrieved_contexts": [],
    "ground_truth_contexts": [
      "Sequential computation in RNNs limits parallelization, while attention allows full parallel processing."
    ],
    "generated_answer": "",
    "ground_truth_answer": "Transformers remove recurrence to enable parallel computation and improve efficiency.",
    "latency_ms": 0
  },
  {
    "question": "how does self attention capture relationships between words?",
    "retrieved_contexts": [],
    "ground_truth_contexts": [
      "Self-attention allows each position to attend to all other positions in the sequence."
    ],
    "generated_answer": "",
    "ground_truth_answer": "Self-attention captures relationships by letting each word attend to all other words and compute dependencies.",
    "latency_ms": 0
  },
  {
    "question": "why scaling is used in dot product attention?",
    "retrieved_contexts": [],
    "ground_truth_contexts": [
      "Dot products grow large in magnitude causing small gradients; scaling prevents this."
    ],
    "generated_answer": "",
    "ground_truth_answer": "Scaling prevents large dot-product values from making gradients too small and unstable.",
    "latency_ms": 0
  },
  {
    "question": "what problem does multi head attention solve?",
    "retrieved_contexts": [],
    "ground_truth_contexts": [
      "Multiple heads allow attention to focus on different representation subspaces."
    ],
    "generated_answer": "",
    "ground_truth_answer": "It allows the model to capture different types of relationships simultaneously instead of averaging everything.",
    "latency_ms": 0
  },
  {
    "question": "how encoder and decoder interact in transformer?",
    "retrieved_contexts": [],
    "ground_truth_contexts": [
      "Decoder attends to encoder outputs using encoder-decoder attention."
    ],
    "generated_answer": "",
    "ground_truth_answer": "The decoder uses encoder outputs through attention to generate the final sequence.",
    "latency_ms": 0
  },
  {
    "question": "what happens if we remove positional encoding?",
    "retrieved_contexts": [],
    "ground_truth_contexts": [
      "Without positional encoding, the model cannot understand sequence order."
    ],
    "generated_answer": "",
    "ground_truth_answer": "The model would not know the order of tokens, making sequence understanding difficult.",
    "latency_ms": 0
  },
  {
    "question": "how transformer handles long sequences better than rnn?",
    "retrieved_contexts": [],
    "ground_truth_contexts": [
      "Self-attention provides constant path length between positions."
    ],
    "generated_answer": "",
    "ground_truth_answer": "Transformers handle long sequences better because each token can directly attend to all others.",
    "latency_ms": 0
  },
  {
    "question": "what is the role of feed forward network in transformer?",
    "retrieved_contexts": [],
    "ground_truth_contexts": [
      "Feed-forward networks process each position independently."
    ],
    "generated_answer": "",
    "ground_truth_answer": "It applies transformations to each token independently after attention to refine representations.",
    "latency_ms": 0
  },
  {
    "question": "how residual connections help transformer training?",
    "retrieved_contexts": [],
    "ground_truth_contexts": [
      "Residual connections help gradients flow and stabilize training."
    ],
    "generated_answer": "",
    "ground_truth_answer": "They help prevent vanishing gradients and make training deeper models easier.",
    "latency_ms": 0
  },
  {
    "question": "how masking works in decoder self attention?",
    "retrieved_contexts": [],
    "ground_truth_contexts": [
      "Masking prevents positions from attending to future tokens."
    ],
    "generated_answer": "",
    "ground_truth_answer": "Masking ensures the model only uses past tokens when predicting the next token.",
    "latency_ms": 0
  },
  {
    "question": "what is the meaning of query, key, value in attention?",
    "retrieved_contexts": [],
    "ground_truth_contexts": [
      "Attention computes compatibility between queries and keys to weight values."
    ],
    "generated_answer": "",
    "ground_truth_answer": "Queries search for relevant information, keys represent content, and values carry the actual information.",
    "latency_ms": 0
  },
  {
    "question": "how transformer achieves parallelization?",
    "retrieved_contexts": [],
    "ground_truth_contexts": [
      "Attention removes sequential dependencies enabling parallel computation."
    ],
    "generated_answer": "",
    "ground_truth_answer": "Transformers process all tokens simultaneously instead of sequentially, enabling parallel computation.",
    "latency_ms": 0
  },
  {
    "question": "what is difference between single head and multi head attention?",
    "retrieved_contexts": [],
    "ground_truth_contexts": [
      "Multi-head attention uses multiple attention mechanisms in parallel."
    ],
    "generated_answer": "",
    "ground_truth_answer": "Single head looks at one perspective, while multi-head captures multiple relationships in parallel.",
    "latency_ms": 0
  },
  {
    "question": "how attention weights are calculated internally?",
    "retrieved_contexts": [],
    "ground_truth_contexts": [
      "Attention weights are computed using softmax of scaled dot products of queries and keys."
    ],
    "generated_answer": "",
    "ground_truth_answer": "Weights are calculated using softmax over scaled dot products between queries and keys.",
    "latency_ms": 0
  },

  {
    "question": "explain full flow of transformer from input to output step by step",
    "retrieved_contexts": [],
    "ground_truth_contexts": [
      "Input embeddings are processed through encoder layers, then decoder uses them to generate outputs."
    ],
    "generated_answer": "",
    "ground_truth_answer": "Input tokens are embedded, processed through encoder layers, and then decoded step by step using attention to produce outputs.",
    "latency_ms": 0
  },
  {
    "question": "how scaled dot product attention avoids gradient issues?",
    "retrieved_contexts": [],
    "ground_truth_contexts": [
      "Scaling prevents large dot products from causing small gradients."
    ],
    "generated_answer": "",
    "ground_truth_answer": "Scaling reduces large values in dot products, preventing gradients from becoming too small.",
    "latency_ms": 0
  },
  {
    "question": "compare computational complexity of self-attention vs rnn vs cnn",
    "retrieved_contexts": [],
    "ground_truth_contexts": [
      "Self-attention has O(n^2·d), RNN O(n·d^2), CNN O(k·n·d^2)."
    ],
    "generated_answer": "",
    "ground_truth_answer": "Self-attention scales with sequence length squared, RNNs scale sequentially, and CNNs depend on kernel size and depth.",
    "latency_ms": 0
  },
  {
    "question": "how multi-head attention improves representation learning?",
    "retrieved_contexts": [],
    "ground_truth_contexts": [
      "Multiple heads capture information from different subspaces."
    ],
    "generated_answer": "",
    "ground_truth_answer": "It allows the model to learn different relationships simultaneously, improving representation quality.",
    "latency_ms": 0
  },
  {
    "question": "why shorter path length in transformer helps learning long dependencies?",
    "retrieved_contexts": [],
    "ground_truth_contexts": [
      "Shorter paths between tokens make learning dependencies easier."
    ],
    "generated_answer": "",
    "ground_truth_answer": "Shorter paths allow faster information flow between tokens, making long-range dependencies easier to learn.",
    "latency_ms": 0
  },
  {
    "question": "what trade-offs exist in self-attention (like resolution vs efficiency)?",
    "retrieved_contexts": [],
    "ground_truth_contexts": [
      "Self-attention reduces path length but may reduce resolution due to averaging."
    ],
    "generated_answer": "",
    "ground_truth_answer": "Self-attention improves efficiency and connectivity but can lose fine-grained detail due to averaging effects.",
    "latency_ms": 0
  },

  {
    "question": "does transformer use rnn internally?",
    "retrieved_contexts": [],
    "ground_truth_contexts": [
      "Transformer removes recurrence entirely."
    ],
    "generated_answer": "",
    "ground_truth_answer": "No, Transformer does not use RNNs.",
    "latency_ms": 0
  },
  {
    "question": "transformer uses cnn right?",
    "retrieved_contexts": [],
    "ground_truth_contexts": [
      "Transformer does not use convolution."
    ],
    "generated_answer": "",
    "ground_truth_answer": "No, Transformer does not use CNNs.",
    "latency_ms": 0
  },
  {
    "question": "what is photosynthesis?",
    "retrieved_contexts": [],
    "ground_truth_contexts": [],
    "generated_answer": "",
    "ground_truth_answer": "I don't know based on the provided context.",
    "latency_ms": 0
  },
  {
    "question": "explain transformer in 1 word",
    "retrieved_contexts": [],
    "ground_truth_contexts": [
      "Transformer is based on attention."
    ],
    "generated_answer": "",
    "ground_truth_answer": "Attention.",
    "latency_ms": 0
  }
]