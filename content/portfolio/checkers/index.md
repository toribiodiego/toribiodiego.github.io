---
title: "Board Game Agents"
date: 2024-12-20
portfolio_tags: ["Reinforcement Learning", "Deep Learning"]
summary: "Learned tic-tac-toe and checkers entirely through self-play."
highlights:
  - "1"
  - "2"
  - "3"

draft: true
---

Structure: 
- Introduction : what we built - an agent that plays checkers
    - what the agent can do: play checkers
    - how we did this
        - the agent learned to play checkers by playing against itself
        - used Proximal Policy Optimization to train the agent
            - include PPO & AlphaGo paper as inspiration
    - clarification: 
        - what this isn't... a checkers engine, this agent learned to play without any understanding of the rules (hidden states), and its decisions generalize based on past played games.
    
- Results
   - charts showing the performance of the agents
      - losing, winning, drawing
      - stability on rewards graph
   - videos showing playing style after certain simulations

Interactive Demo: 
   - agent (trained weights) and an interface you can play on
   - make need to create an actual GUI to have users play against the checkers agent.
      - would be interesting to have diffciulties of "hardness" like one that plays normally, one








