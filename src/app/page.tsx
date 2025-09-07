'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useTheme } from 'next-themes';
import { useToast } from '@/hooks/use-toast';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

interface Subject {
  id: number;
  name: string;
  attended: number;
  delivered: number;
  examDate: string;
}

interface ScheduleItem {
  period: string;
  time: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
}

export default function AttendanceTracker() {
  const { theme, setTheme } = useTheme();
  const { toast: uiToast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [originalSubjects, setOriginalSubjects] = useState<Subject[]>([]);
  const [activeTab, setActiveTab] = useState('attendance');
  
  const [schedule] = useState<ScheduleItem[]>([
    {
      period: 'Period 1',
      time: '6:00 AM - 6:40 AM',
      monday: 'Fundamentals of Financial Management (Prof: SMD)',
      tuesday: 'FINTECH (Prof: TB)',
      wednesday: 'Corporate Accounting (Prof: MOB)',
      thursday: 'Financial Markets, Banking and other Financial Institutions (Prof: JYB)',
      friday: 'Fundamentals of Financial Management (Prof: SMD)'
    },
    {
      period: 'Period 2',
      time: '6:40 AM - 7:20 AM',
      monday: 'Fundamentals of Financial Management (Prof: SMD)',
      tuesday: 'Principles of Marketing (Prof: AC)',
      wednesday: 'Principles of Marketing (Prof: AC)',
      thursday: 'Fundamentals of Financial Management (Prof: AR)',
      friday: 'Principles of Marketing (Prof: AC)'
    },
    {
      period: 'Period 3',
      time: '7:20 AM - 8:00 AM',
      monday: 'Corporate Accounting (Prof: MOB)',
      tuesday: 'Fundamentals of Financial Management (Prof: AR)',
      wednesday: 'Principles of Marketing (Prof: AC)',
      thursday: 'FINTECH (Prof: TB)',
      friday: 'Principles of Marketing (Prof: AC)'
    },
    {
      period: 'Break',
      time: '8:00 AM - 8:30 AM',
      monday: 'Break',
      tuesday: 'Break',
      wednesday: 'Break',
      thursday: 'Break',
      friday: 'Break'
    },
    {
      period: 'Period 4',
      time: '8:30 AM - 9:10 AM',
      monday: 'Corporate Accounting (Prof: MOB)',
      tuesday: 'Financial Markets, Banking and other Financial Institutions (Prof: JYB)',
      wednesday: 'Corporate Accounting (Prof: MOB)',
      thursday: 'Human Resource Management (Prof: TS)',
      friday: 'Human Resource Management (Prof: AB)'
    },
    {
      period: 'Period 5',
      time: '9:10 AM - 9:50 AM',
      monday: 'FINTECH (Prof: TB)',
      tuesday: 'Financial Markets, Banking and other Financial Institutions (Prof: JYB)',
      wednesday: 'Financial Markets, Banking and other Financial Institutions (Prof: JYB)',
      thursday: 'Human Resource Management (Prof: TS)',
      friday: 'Human Resource Management (Prof: AB)'
    }
  ]);

  // Simulate loading data
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const initialSubjects: Subject[] = [
          {
            id: 1,
            name: 'Corporate Accounting',
            attended: 17,
            delivered: 29,
            examDate: '18 September 2025 (Thursday)'
          },
          {
            id: 2,
            name: 'Financial Markets & Banking',
            attended: 21,
            delivered: 33,
            examDate: '19 September 2025 (Friday)'
          },
          {
            id: 3,
            name: 'FinTech',
            attended: 18,
            delivered: 25,
            examDate: '13 September 2025 (Saturday)'
          },
          {
            id: 4,
            name: 'Fundamentals of Financial Management',
            attended: 29,
            delivered: 41,
            examDate: '16 September 2025 (Tuesday)'
          },
          {
            id: 5,
            name: 'Human Resource Management',
            attended: 20,
            delivered: 29,
            examDate: '15 September 2025 (Monday)'
          },
          {
            id: 6,
            name: 'Principles of Marketing',
            attended: 28,
            delivered: 38,
            examDate: '17 September 2025 (Wednesday)'
          }
        ];
        
        setSubjects(initialSubjects);
        setOriginalSubjects(JSON.parse(JSON.stringify(initialSubjects)));
      } catch (err) {
        setError('Failed to load attendance data');
        toast.error('Failed to load attendance data');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const calculatePercentage = (attended: number, delivered: number): number => {
    return delivered === 0 ? 0 : parseFloat(((attended / delivered) * 100).toFixed(1));
  };

  const getProgressBarColor = (percentage: number): string => {
    if (percentage >= 75) return 'bg-green-500';
    if (percentage >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getPercentageTextColor = (percentage: number): string => {
    if (percentage >= 75) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPercentageBadgeVariant = (percentage: number): "default" | "secondary" | "destructive" | "outline" => {
    if (percentage >= 75) return 'default';
    if (percentage >= 60) return 'secondary';
    return 'destructive';
  };

  const calculateClassesNeeded = (attended: number, delivered: number): number => {
    const targetPercentage = 75;
    if (delivered === 0) return 0;
    
    // Calculate how many more classes needed to reach 75%
    // Formula: (attended + x) / (delivered + x) = 0.75
    // Solving for x: x = (0.75 * delivered - attended) / 0.25
    const needed = Math.ceil((0.75 * delivered - attended) / 0.25);
    return needed > 0 ? needed : 0;
  };

  const handleAttendClass = (id: number) => {
    setSubjects(prevSubjects => 
      prevSubjects.map(subject => 
        subject.id === id 
          ? { ...subject, attended: subject.attended + 1, delivered: subject.delivered + 1 }
          : subject
      )
    );
    const subject = subjects.find(s => s.id === id);
    if (subject) {
      toast.success(`Attended ${subject.name} class!`);
    }
  };

  const handleMissClass = (id: number) => {
    setSubjects(prevSubjects => 
      prevSubjects.map(subject => 
        subject.id === id 
          ? { ...subject, delivered: subject.delivered + 1 }
          : subject
      )
    );
    const subject = subjects.find(s => s.id === id);
    if (subject) {
      toast.warning(`Missed ${subject.name} class`);
    }
  };

  const resetAttendance = () => {
    setSubjects(JSON.parse(JSON.stringify(originalSubjects)));
    toast.info('Attendance reset to original values');
  };

  const calculateOverallAttendance = (subjectsList: Subject[]): number => {
    const totalAttended = subjectsList.reduce((sum, subject) => sum + subject.attended, 0);
    const totalDelivered = subjectsList.reduce((sum, subject) => sum + subject.delivered, 0);
    return totalDelivered === 0 ? 0 : parseFloat(((totalAttended / totalDelivered) * 100).toFixed(1));
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    toast.success(`Switched to ${newTheme} mode`);
  };

  const overallAttendance = calculateOverallAttendance(subjects);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="container mx-auto">
          <div className="space-y-8">
            <Skeleton className="h-32 w-full" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-64" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{error}</p>
            <Button onClick={() => window.location.reload()} className="w-full">
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <header className="bg-card rounded-2xl shadow-lg p-6 mb-8 transition-all duration-300">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                Student Attendance Tracker
              </h1>
              <p className="text-muted-foreground text-base md:text-lg">
                Track your attendance and plan ahead for academic success
              </p>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Button
                onClick={toggleTheme}
                variant="outline"
                size="icon"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <span className="text-xl">☀️</span>
                ) : (
                  <span className="text-xl">🌙</span>
                )}
              </Button>
            </div>
          </div>
        </header>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="attendance" className="text-sm md:text-lg">
              📊 Attendance
            </TabsTrigger>
            <TabsTrigger value="exams" className="text-sm md:text-lg">
              📅 Exams
            </TabsTrigger>
            <TabsTrigger value="schedule" className="text-sm md:text-lg">
              ⏰ Schedule
            </TabsTrigger>
          </TabsList>

          {/* Overall Attendance Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl">Overall Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className={`text-4xl md:text-5xl font-bold ${getPercentageTextColor(overallAttendance)} mb-4`}>
                    {overallAttendance}%
                  </p>
                  <p className="text-muted-foreground text-sm md:text-base">
                    {subjects.reduce((sum, subject) => sum + subject.attended, 0)} of {' '}
                    {subjects.reduce((sum, subject) => sum + subject.delivered, 0)} total classes attended
                  </p>
                </div>
                <div className="w-full md:w-64">
                  <Progress 
                    value={overallAttendance} 
                    className="h-6"
                  />
                  <div className="flex justify-between mt-4 text-xs">
                    <span className="text-red-600">Below 60%</span>
                    <span className="text-yellow-600">60-75%</span>
                    <span className="text-green-600">Above 75%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reset Button */}
          <div className="mb-8 flex justify-end">
            <Button
              onClick={resetAttendance}
              variant="outline"
              className="hover:bg-destructive hover:text-destructive-foreground"
            >
              🔄 Reset to Original Values
            </Button>
          </div>

          {/* Attendance Tab */}
          <TabsContent value="attendance" className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Subject-wise Attendance Details</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {subjects.map((subject) => {
                const percentage = calculatePercentage(subject.attended, subject.delivered);
                const classesNeeded = calculateClassesNeeded(subject.attended, subject.delivered);
                
                return (
                  <Card key={subject.id} className="transition-all duration-300 hover:shadow-xl">
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <CardTitle className="text-lg md:text-xl">{subject.name}</CardTitle>
                        <Badge variant={getPercentageBadgeVariant(percentage)}>
                          {percentage}%
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-muted-foreground text-sm">
                              Attendance: {subject.attended} / {subject.delivered}
                            </span>
                            <span className="text-muted-foreground text-sm">
                              {subject.delivered - subject.attended} missed
                            </span>
                          </div>
                          <Progress value={percentage} className="h-4" />
                        </div>
                        
                        <div className="bg-muted p-4 rounded-xl">
                          <p className="font-medium text-sm md:text-base">
                            {classesNeeded > 0 
                              ? `🎯 Need to attend ${classesNeeded} more consecutive class${classesNeeded !== 1 ? 'es' : ''} to reach 75%` 
                              : "🎉 Excellent! You've reached or exceeded the 75% target!"}
                          </p>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Button
                            onClick={() => handleAttendClass(subject.id)}
                            className="flex-1 bg-green-500 hover:bg-green-600"
                          >
                            ✅ Attend Class
                          </Button>
                          <Button
                            onClick={() => handleMissClass(subject.id)}
                            variant="destructive"
                            className="flex-1"
                          >
                            ❌ Miss Class
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Exams Tab */}
          <TabsContent value="exams" className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">📅 Exam Schedule</h2>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {subjects.map((subject) => (
                    <div key={subject.id} className="flex flex-col md:flex-row md:items-center md:justify-between p-4 rounded-xl bg-muted transition-all duration-300">
                      <div className="flex-1">
                        <h3 className="text-lg md:text-xl font-bold mb-1">{subject.name}</h3>
                        <Badge variant="outline" className="text-sm">
                          {subject.examDate}
                        </Badge>
                      </div>
                      <div className="mt-3 md:mt-0">
                        <Badge variant={getPercentageBadgeVariant(calculatePercentage(subject.attended, subject.delivered))}>
                          {calculatePercentage(subject.attended, subject.delivered)}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between p-4 rounded-xl bg-muted transition-all duration-300">
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-bold mb-1">Corporate Accounting & Consumer Behaviour and Services Marketing</h3>
                      <Badge variant="outline" className="text-sm">
                        18 September 2025 (Thursday)
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule" className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">⏰ Weekly Class Schedule</h2>
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs md:text-sm">Period</TableHead>
                        <TableHead className="text-xs md:text-sm">Time</TableHead>
                        <TableHead className="text-xs md:text-sm">Monday</TableHead>
                        <TableHead className="text-xs md:text-sm">Tuesday</TableHead>
                        <TableHead className="text-xs md:text-sm">Wednesday</TableHead>
                        <TableHead className="text-xs md:text-sm">Thursday</TableHead>
                        <TableHead className="text-xs md:text-sm">Friday</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {schedule.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium text-xs md:text-sm">{item.period}</TableCell>
                          <TableCell className="text-blue-600 text-xs md:text-sm">{item.time}</TableCell>
                          <TableCell className={item.period === 'Break' ? 'bg-muted' : ''}>
                            <div className="font-medium text-xs md:text-sm">{item.monday.split(' (')[0]}</div>
                            {item.monday.includes('(') && (
                              <div className="text-xs text-muted-foreground">
                                {item.monday.split(' (')[1].replace(')', '')}
                              </div>
                            )}
                          </TableCell>
                          <TableCell className={item.period === 'Break' ? 'bg-muted' : ''}>
                            <div className="font-medium text-xs md:text-sm">{item.tuesday.split(' (')[0]}</div>
                            {item.tuesday.includes('(') && (
                              <div className="text-xs text-muted-foreground">
                                {item.tuesday.split(' (')[1].replace(')', '')}
                              </div>
                            )}
                          </TableCell>
                          <TableCell className={item.period === 'Break' ? 'bg-muted' : ''}>
                            <div className="font-medium text-xs md:text-sm">{item.wednesday.split(' (')[0]}</div>
                            {item.wednesday.includes('(') && (
                              <div className="text-xs text-muted-foreground">
                                {item.wednesday.split(' (')[1].replace(')', '')}
                              </div>
                            )}
                          </TableCell>
                          <TableCell className={item.period === 'Break' ? 'bg-muted' : ''}>
                            <div className="font-medium text-xs md:text-sm">{item.thursday.split(' (')[0]}</div>
                            {item.thursday.includes('(') && (
                              <div className="text-xs text-muted-foreground">
                                {item.thursday.split(' (')[1].replace(')', '')}
                              </div>
                            )}
                          </TableCell>
                          <TableCell className={item.period === 'Break' ? 'bg-muted' : ''}>
                            <div className="font-medium text-xs md:text-sm">{item.friday.split(' (')[0]}</div>
                            {item.friday.includes('(') && (
                              <div className="text-xs text-muted-foreground">
                                {item.friday.split(' (')[1].replace(')', '')}
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <footer className="mt-12 py-8 text-center">
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground text-base md:text-lg">
                Attendance Tracker App © {new Date().getFullYear()}
              </p>
              <p className="text-muted-foreground text-sm md:text-base mt-2">
                Stay on top of your attendance goals!
              </p>
            </CardContent>
          </Card>
        </footer>
      </div>
    </div>
  );
}