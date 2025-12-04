---
title: "Board Game Agents"
date: 2025-04-26
summary: "Applied Proximal Policy Optimization with self-play to train agents that play CartPole, Tic-Tac-Toe, and Checkers."
highlights:
  - "Implemented enhanced PPO with orthogonal initialization, GAE, and entropy bonuses to stabilize training across three game environments"
  - "Tracked policy loss, value loss, entropy, and KL divergence using TensorBoard and Weights & Biases for systematic debugging"
  - "Achieved 400+ episodic return on CartPole, 775 wins on Tic-Tac-Toe medium difficulty, and 56.5% win rate on Checkers"
portfolio_tags: ["Reinforcement Learning", "Deep Learning"]

draft: true
---

<figure class="post-figure">
  <img src="resources/01_reward_curves.png" alt="Reward curves during PPO training" style="width:100%; height:auto; display:block; margin:auto;">
  <figcaption>PPO reward curves across self-play sessions (CartPole, Tic-Tac-Toe, Checkers) showing convergence and variance.</figcaption>
</figure>

<figure class="post-figure">
  <img src="resources/02_winrate.png" alt="Win/draw/loss rates for PPO agents" style="width:100%; height:auto; display:block; margin:auto;">
  <figcaption>Win/draw/loss rates over evaluation episodes; Checkers agent reached a 56.5% win rate.</figcaption>
</figure>

<figure class="post-figure">
  <img src="resources/03_policy_loss.png" alt="Policy loss during PPO training" style="width:100%; height:auto; display:block; margin:auto;">
  <figcaption>Policy loss trends during training, monitored alongside value loss and entropy for stability.</figcaption>
</figure>

<figure class="post-table">
  <table>
    <thead>
      <tr>
        <th>Scenario</th>
        <th>Agent Wins</th>
        <th>Random Wins</th>
        <th>Draws</th>
        <th>Avg. Moves</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Baseline</td>
        <td>502</td>
        <td>498</td>
        <td>0</td>
        <td>83.20</td>
      </tr>
      <tr>
        <td>After 1K games</td>
        <td>554</td>
        <td>446</td>
        <td>0</td>
        <td>162.75</td>
      </tr>
      <tr>
        <td>After 2K games</td>
        <td>548</td>
        <td>435</td>
        <td>0</td>
        <td>162.30</td>
      </tr>
      <tr>
        <td>After 5K (agent first)</td>
        <td>565</td>
        <td>450</td>
        <td>0</td>
        <td>161.03</td>
      </tr>
      <tr>
        <td>After 5K (random first)</td>
        <td>550</td>
        <td>450</td>
        <td>0</td>
        <td>159.89</td>
      </tr>
    </tbody>
  </table>
  <figcaption>Performance progression against random opponent. Win rate improved from 50% (baseline) to 56.5% after 5K games, while game length doubled as agents learned strategic play.</figcaption>
</figure>
