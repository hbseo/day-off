import {
  Card as CardContainer,
  CardHeader,
  CardContent,
  CardTitle,
} from '../ui/card';
import { fetchCardData } from '@/lib/off/data';
import { Sun, CloudSun, CloudRainWind } from 'lucide-react';

const iconMap = {
  total: Sun,
  use: CloudRainWind,
  remain: CloudSun,
};

const Card = ({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'total' | 'use' | 'remain';
}) => {
  const Icon = iconMap[type];
  return (
    <CardContainer>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}일</div>
      </CardContent>
    </CardContainer>
  );
};

const CardWrapper = async () => {
  const { total, use, remain } = await fetchCardData();
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <Card title="생성" value={total} type="total" />
      <Card title="사용" value={use} type="use" />
      <Card title="잔여" value={remain} type="remain" />
    </div>
  );
};

export default CardWrapper;
