import React from 'react';
import { Card, CardContent } from './ui/card';

export const StatsCard: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
  <Card className="flex-1">
    <CardContent className="flex flex-col gap-1">
      <span className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400">{label}</span>
      <span className="text-2xl font-semibold">{value}</span>
    </CardContent>
  </Card>
);
