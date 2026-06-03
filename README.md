# 🧠 AI Brain - Context-Aware Knowledge Retrieval System

> A production-oriented Retrieval-Augmented Generation (RAG) system that enables users to interact with PDF documents through natural language conversations using semantic retrieval, hybrid search, conversational memory, and LLM-powered reasoning.

![License](https://img.shields.io/badge/Status-Active-success)
![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![React](https://img.shields.io/badge/React-Frontend-blue)
![Qdrant](https://img.shields.io/badge/Qdrant-VectorDB-red)
![Gemini](https://img.shields.io/badge/Gemini-LLM-orange)

---

# 📖 Overview

AI Brain is a context-aware RAG application designed to answer questions from PDF documents with high retrieval accuracy and conversational understanding.

The system extracts content from uploaded PDFs, performs semantic chunking, generates embeddings using Nomic Embeddings, stores vectors in Qdrant, retrieves information through hybrid search, and generates grounded responses using Gemini 2.5 Flash.

Unlike traditional PDF chatbots, AI Brain incorporates:

- Semantic Chunking
- Hybrid Search
- Conversational Memory
- Session-Based Context Awareness
- Table Understanding
- Batch Embedding Processing
- RAG Evaluation Framework

to improve answer quality and reduce hallucinations.

---

# ✨ Features

## 📄 PDF Knowledge Ingestion

- Upload PDF documents
- Extract content using Unstructured API
- Process text, headings, sections, and tables
- Automatically prepare content for retrieval

---

## 🧩 Semantic Chunking

Documents are chunked based on semantic structure rather than fixed token sizes.

### Benefits

- Preserves section-level meaning
- Improves retrieval relevance
- Reduces context fragmentation
- Better answer quality

---

## 🔍 Hybrid Search

AI Brain combines:

### Dense Retrieval

- Nomic Embeddings
- Semantic similarity search

### Sparse Retrieval

- Keyword matching
- Exact term retrieval

### Result

Improved retrieval precision and recall compared to pure vector search.

---

## 🧠 Conversational Memory

The system stores conversations in MongoDB.

### Memory Strategy

- Session-based memory
- Last 8 conversation turns retained
- Context injected into prompts

### Benefits

- Natural follow-up questions
- Better contextual understanding
- Improved conversational continuity

Example:

```text
User: What are the key findings?

Assistant: ...

User: Explain the second one in simple terms.
```

The system understands what "second one" refers to.

---

## 📊 Table Understanding

Tables often lose semantic meaning when embedded directly.

### Solution

1. Extract tables as HTML using Unstructured.
2. Send table structure to Gemini.
3. Convert tables into meaningful natural language.
4. Generate embeddings from the generated description.

### Benefits

- Preserves relationships between rows and columns.
- Improves retrievability.
- Better answers for numerical and tabular data.

---

## ⚡ Batch Embedding Processing

Embeddings are generated in batches.

### Benefits

- Faster ingestion
- Reduced API overhead
- Better scalability
- Improved throughput

---

## 🤖 Grounded Response Generation

The system retrieves relevant context before generating responses.

### Retrieval Pipeline

- Query Processing
- Hybrid Search
- Context Retrieval
- Memory Injection
- Gemini Response Generation

This ensures responses are grounded in document content.

---

# 🏗️ Architecture

```text
                    ┌─────────────┐
                    │ PDF Upload  │
                    └──────┬──────┘
                           │
                           ▼
                ┌──────────────────┐
                │ Unstructured API │
                └──────┬───────────┘
                       │
         ┌─────────────┴─────────────┐
         │                           │
         ▼                           ▼
  Semantic Chunks             HTML Tables
         │                           │
         │                    Gemini Conversion
         │                           │
         └─────────────┬─────────────┘
                       ▼
              Nomic Embeddings
                       │
                       ▼
                  Qdrant DB
                       │
                Hybrid Search
                       │
                       ▼
              Retrieved Context
                       │
       Last 8 Conversation Turns
                       │
                       ▼
               Gemini 2.5 Flash
                       │
                       ▼
                 Final Response
```

---

# 🛠️ Tech Stack

## Frontend

- React
- Axios

## Backend

- Node.js
- Express.js

## LLM

- Gemini 2.5 Flash

## Embeddings

- Nomic Embeddings

## Vector Database

- Qdrant

## Database

- MongoDB

## Document Processing

- Unstructured API

## Infrastructure

- Docker

---

# 📂 Project Structure

```text
AI-BRAIN
│
├── backend
│   ├── config
│   ├── middleware
│   ├── models
│   ├── router
│   ├── samples
│   ├── services
│   ├── uploads
│   ├── utils
│   ├── vector_database
│   ├── server.js
│   └── package.json
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── api
│   │   ├── assets
│   │   ├── components
│   │   ├── hooks
│   │   ├── pages
│   │   ├── services
│   │   ├── utils
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
└── README.md
```

---

# 🔥 Engineering Highlights

## Why Semantic Chunking?

Fixed-size chunking often splits important information across chunks.

Semantic chunking:

- Preserves document structure
- Maintains logical boundaries
- Improves retrieval quality

---

## Why Hybrid Search?

Vector search alone may miss exact keywords.

Keyword search alone misses semantic meaning.

Hybrid search combines both approaches to improve retrieval performance.

---

## Why Conversation Memory?

Most RAG systems treat each query independently.

AI Brain stores session history and injects the last 8 conversation turns to support context-aware interactions.

---

## Why Table-to-Text Conversion?

Embedding raw HTML tables often produces poor retrieval results.

Converting tables into natural language descriptions:

- Preserves semantics
- Improves retrievability
- Enhances answer quality

---

# ⚙️ Setup Guide

## Prerequisites

Install:

- Node.js (18+)
- Docker
- MongoDB
- Git

Verify:

```bash
node -v
npm -v
docker --version
```

---

# 🐳 Qdrant Setup

Pull Qdrant image:

```bash
docker pull qdrant/qdrant
```

Run container:

```bash
docker run -d ^
--name qdrant ^
-p 6333:6333 ^
-p 6334:6334 ^
-v qdrant_storage:/qdrant/storage ^
qdrant/qdrant
```

Verify:

```text
http://localhost:6333/dashboard
```

---

# 🍃 MongoDB Setup

Option 1:

Use MongoDB Atlas

Option 2:

Run locally

```bash
mongod
```

---

# 🔑 Environment Variables

Create:

```bash
backend/.env
```

Add:

```env
UNSTRUCTURED_API_KEY=your_unstructured_key

TABLE_TO_TEXT_GEMINI=your_gemini_key

RETRIVAL_GEMINI_KEY=your_gemini_key

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

JWT_REFRESH_SECRET=your_refresh_secret
```

⚠️ Never commit `.env` files to GitHub.

---

# 📦 Backend Installation

Navigate:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Run server:

```bash
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

---

# 🎨 Frontend Installation

Navigate:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# 🚀 Running the Application

### Step 1

Start MongoDB

```bash
mongod
```

### Step 2

Start Qdrant

```bash
docker start qdrant
```

### Step 3

Start Backend

```bash
cd backend
npm run dev
```

### Step 4

Start Frontend

```bash
cd frontend
npm run dev
```

Open:

```text
http://localhost:5173
```

---

# 📝 Usage

## Upload a PDF

- Open AI Brain
- Upload a PDF
- Wait for ingestion

The system will:

- Extract content
- Process tables
- Perform semantic chunking
- Generate embeddings
- Store vectors in Qdrant

---

## Ask Questions

Examples:

```text
Summarize the document.
```

```text
What are the key findings?
```

```text
Explain the table on page 5.
```

```text
Compare the revenue between 2022 and 2023.
```

```text
What risks were mentioned?
```

---

## Follow-Up Questions

```text
Explain the second point in simple terms.
```

```text
Can you provide more details?
```

```text
Give an example.
```

Context is preserved using conversation memory.

---

# 🔬 RAG Evaluation Framework

Currently implementing a comprehensive evaluation framework to measure:

- Faithfulness
- Answer Relevancy
- Context Precision
- Context Recall
- Retrieval Effectiveness

The goal is to move beyond retrieval metrics and evaluate actual answer quality.

---

# 🚧 Future Improvements

- Reranking Models
- Query Rewriting
- Context Compression
- Citation-Based Responses
- Multi-Document Reasoning
- Knowledge Graph Integration
- Agentic Retrieval Workflows

---

# 📈 Challenges Solved

✅ Context-Aware Conversations

✅ Hybrid Retrieval

✅ Semantic Chunking

✅ Table Semantic Preservation

✅ Session-Based Memory

✅ Batch Embedding Processing

✅ Grounded Response Generation

✅ Scalable Vector Storage

---

# 👨‍💻 Author

Built with a passion for AI systems, knowledge retrieval, and practical RAG engineering.

If you found this project interesting, consider giving it a ⭐ and sharing feedback.
