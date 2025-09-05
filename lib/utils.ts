export function formatTimestamp(timestamp: string): string {
  return new Date(timestamp).toLocaleString();
}

export function generateIncidentId(): string {
  return `incident_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export async function generateAISummary(transcript: string): Promise<string> {
  // This would integrate with OpenAI API in a real implementation
  // For now, return a placeholder
  return `Incident summary: ${truncateText(transcript, 100)}`;
}
