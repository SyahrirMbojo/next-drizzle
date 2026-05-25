import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendDownIcon, TrendUpIcon } from "@phosphor-icons/react";

export default function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-gradient-to-t from-primary/5 to-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardDescription>Total Revenue</CardDescription>
          <CardAction>
            <Badge variant="outline">
              <TrendUpIcon />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardContent>
          <CardTitle className="text-2xl font-semibold">$1,250.00</CardTitle>
        </CardContent>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Trending up this month <TrendUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
      <Card className="bg-gradient-to-t from-primary/5 to-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardDescription>New Customers</CardDescription>
          <CardAction>
            <Badge variant="outline">
              <TrendDownIcon />
              -20%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardContent>
          <CardTitle className="text-2xl font-semibold">1,234</CardTitle>
        </CardContent>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Down 20% this period <TrendDownIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Acquisition needs attention
          </div>
        </CardFooter>
      </Card>
      <Card className="bg-gradient-to-t from-primary/5 to-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardDescription>Active Accounts</CardDescription>
          <CardAction>
            <Badge variant="outline">
              <TrendUpIcon />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardContent>
          <CardTitle className="text-2xl font-semibold">45,678</CardTitle>
        </CardContent>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Strong user retention <TrendUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">Engagement exceed targets</div>
        </CardFooter>
      </Card>
      <Card className="bg-gradient-to-t from-primary/5 to-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardDescription>Growth Rate</CardDescription>
          <CardAction>
            <Badge variant="outline">
              <TrendUpIcon />
              +4.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardContent>
          <CardTitle className="text-2xl font-semibold">4.5%</CardTitle>
        </CardContent>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Steady performance increase <TrendUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">Meets growth projections</div>
        </CardFooter>
      </Card>
    </div>
  );
}
