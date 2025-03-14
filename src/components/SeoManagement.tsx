
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Wand2, Search, BarChart2, CreditCard, TrendingUp, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SeoManagement: React.FC = () => {
  const { toast } = useToast();
  const [url, setUrl] = useState('');
  const [keyword, setKeyword] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [seoScore, setSeoScore] = useState<number | null>(null);
  
  const handleAnalyze = () => {
    if (!url) {
      toast({
        title: "Error",
        description: "Please enter a valid URL",
        variant: "destructive",
      });
      return;
    }
    
    setAnalyzing(true);
    
    // Simulate API call
    setTimeout(() => {
      // Generate a random score between 60 and 95
      const score = Math.floor(Math.random() * 36) + 60;
      setSeoScore(score);
      setAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: `Your SEO score is ${score}/100`,
      });
    }, 2000);
  };
  
  const handleKeywordAnalysis = () => {
    if (!keyword) {
      toast({
        title: "Error",
        description: "Please enter a keyword to analyze",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Keyword Analysis",
      description: "Analysis started. Results will be available shortly.",
    });
  };
  
  const renderScoreColor = (score: number) => {
    if (score < 70) return "text-orange-500";
    if (score < 85) return "text-yellow-500";
    return "text-green-500";
  };
  
  return (
    <div className="container mx-auto py-10 px-4 max-w-7xl">
      <h1 className="text-3xl font-bold mb-2">AI SEO Management</h1>
      <p className="text-muted-foreground mb-8">Optimize your store with AI-powered SEO tools</p>
      
      <Tabs defaultValue="analyzer" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="analyzer">Site Analyzer</TabsTrigger>
          <TabsTrigger value="keywords">Keyword Research</TabsTrigger>
          <TabsTrigger value="plans">Subscription Plans</TabsTrigger>
        </TabsList>
        
        <TabsContent value="analyzer" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="h-5 w-5" />
                AI SEO Analyzer
              </CardTitle>
              <CardDescription>
                Analyze your store pages for SEO optimization opportunities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex gap-2">
                  <Input 
                    placeholder="Enter page URL (e.g., /products/running-shoes)" 
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                  <Button onClick={handleAnalyze} disabled={analyzing}>
                    {analyzing ? "Analyzing..." : "Analyze"}
                  </Button>
                </div>
                
                {seoScore !== null && (
                  <div className="mt-6 border rounded-lg p-6 bg-muted/30">
                    <h3 className="text-xl font-medium mb-4">Analysis Results</h3>
                    <div className="flex justify-between items-center mb-4">
                      <span>SEO Score:</span>
                      <span className={`text-2xl font-bold ${renderScoreColor(seoScore)}`}>
                        {seoScore}/100
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Title Tag</span>
                        <Badge variant={seoScore > 75 ? "default" : "destructive"}>
                          {seoScore > 75 ? "Good" : "Needs Improvement"}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Meta Description</span>
                        <Badge variant={seoScore > 70 ? "default" : "destructive"}>
                          {seoScore > 70 ? "Good" : "Needs Improvement"}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Image Optimization</span>
                        <Badge variant={seoScore > 80 ? "default" : "destructive"}>
                          {seoScore > 80 ? "Good" : "Needs Improvement"}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Content Quality</span>
                        <Badge variant={seoScore > 85 ? "default" : "destructive"}>
                          {seoScore > 85 ? "Good" : "Needs Improvement"}
                        </Badge>
                      </div>
                    </div>
                    
                    <Button className="mt-6 w-full">
                      View Detailed Report
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="keywords" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Keyword Research
              </CardTitle>
              <CardDescription>
                Discover high-performing keywords for your fashion and shoe products
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex gap-2">
                  <Input 
                    placeholder="Enter a keyword (e.g., 'running shoes')" 
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                  <Select defaultValue="us">
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={handleKeywordAnalysis}>
                    Research
                  </Button>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-xl font-medium mb-4">Popular Keywords</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <div>
                        <h4 className="font-medium">fashion sneakers</h4>
                        <p className="text-sm text-muted-foreground">High competition</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">24,000</p>
                        <p className="text-sm text-muted-foreground">Monthly searches</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <div>
                        <h4 className="font-medium">designer shoes men</h4>
                        <p className="text-sm text-muted-foreground">Medium competition</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">18,500</p>
                        <p className="text-sm text-muted-foreground">Monthly searches</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <div>
                        <h4 className="font-medium">women's summer dresses</h4>
                        <p className="text-sm text-muted-foreground">High competition</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">32,400</p>
                        <p className="text-sm text-muted-foreground">Monthly searches</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="plans" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="flex flex-col border-slate-200">
              <CardHeader>
                <CardTitle>Basic</CardTitle>
                <CardDescription>Essential SEO tools for small stores</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">$19</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>5 page analyses per month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Basic keyword research</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Monthly SEO report</span>
                  </li>
                </ul>
              </CardContent>
              <div className="p-6 pt-0 mt-auto">
                <Button className="w-full">Subscribe</Button>
              </div>
            </Card>
            
            <Card className="flex flex-col border-2 border-primary">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Professional</CardTitle>
                  <Badge>Popular</Badge>
                </div>
                <CardDescription>Advanced tools for growing businesses</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">$49</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>25 page analyses per month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Advanced keyword research</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Competitor analysis</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Weekly SEO reports</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>AI content suggestions</span>
                  </li>
                </ul>
              </CardContent>
              <div className="p-6 pt-0 mt-auto">
                <Button className="w-full">Subscribe</Button>
              </div>
            </Card>
            
            <Card className="flex flex-col border-slate-200">
              <CardHeader>
                <CardTitle>Enterprise</CardTitle>
                <CardDescription>Complete solution for large stores</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">$99</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Unlimited page analyses</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Complete keyword research</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Market trend analysis</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Daily SEO reports</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>AI product descriptions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Priority support</span>
                  </li>
                </ul>
              </CardContent>
              <div className="p-6 pt-0 mt-auto">
                <Button className="w-full">Subscribe</Button>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SeoManagement;
