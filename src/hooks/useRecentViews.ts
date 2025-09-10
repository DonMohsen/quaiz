"use client";

import { DocumentViewWithDocument } from "@/types/document.types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// extend type to include related doc

async function fetchRecentViews(userId: string): Promise<DocumentViewWithDocument[]> {
  const res = await axios.get(`/api/document/views?userId=${userId}`);
  return res.data;
}

export function useRecentViews(userId: string) {
  return useQuery<DocumentViewWithDocument[], Error>({
    queryKey: ["recentViews", userId],
    queryFn: () => fetchRecentViews(userId),
    enabled: !!userId, // only run if we have userId
  });
}