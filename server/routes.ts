import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all challenges
  app.get("/api/challenges", async (req, res) => {
    try {
      const challenges = await storage.getChallenges();
      res.json(challenges);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch challenges" });
    }
  });

  // Get challenges by level
  app.get("/api/challenges/level/:level", async (req, res) => {
    try {
      const level = parseInt(req.params.level);
      const challenges = await storage.getChallengesByLevel(level);
      res.json(challenges);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch challenges by level" });
    }
  });

  // Get all projects
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  // Get projects by level
  app.get("/api/projects/level/:level", async (req, res) => {
    try {
      const level = decodeURIComponent(req.params.level);
      const projects = await storage.getProjectsByLevel(level);
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch projects by level" });
    }
  });

  // Get specific project
  app.get("/api/projects/:id", async (req, res) => {
    try {
      const project = await storage.getProject(req.params.id);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch project" });
    }
  });

  // Get specific challenge
  app.get("/api/challenges/:id", async (req, res) => {
    try {
      const challenge = await storage.getChallenge(req.params.id);
      if (!challenge) {
        return res.status(404).json({ error: "Challenge not found" });
      }
      res.json(challenge);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch challenge" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
