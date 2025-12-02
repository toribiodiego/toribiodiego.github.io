---
title: "Multi-Label Emotion Classification"
date: 2024-05-01
summary: "Applied transformer models to detect multiple emotions in Reddit comments."
highlights:
  - "Fine-tuned six transformer models on 58K samples from the GoEmotions dataset across 27 emotion labels"
  - "Implemented automated hyperparameter sweeps with Weights & Biases, optimizing learning rates, dropout, and batch sizes across 50+ training experiments"
  - "Achieved 95.7% AUC with RoBERTa-Large while DistilBERT reached 94.8% AUC using 75% fewer parameters, enabling efficient deployment"
portfolio_tags: ["Natural Language Processing", "Deep Learning", "Text"]

draft: false
build:
  list: "local"
  render: "link"
---

This project compared transformer architectures for emotion classification on the GoEmotions dataset.