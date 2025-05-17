import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Mail, MessageSquare, LogIn } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const Contact = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
    date: "",
    time: "",
  });
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      setFormData(prev => ({
        ...prev,
        date: format(date, "yyyy-MM-dd")
      }));
    }
  };

  const handleTimeSelect = (time: string) => {
    setFormData(prev => ({
      ...prev,
      time
    }));
    setIsTimePickerOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to book an appointment",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('meeting_requests').insert({
        user_id: user.id,
        subject: formData.subject,
        message: formData.message,
        date: formData.date,
        time: formData.time
      });

      if (error) throw error;

      toast({
        title: "Meeting Request Sent!",
        description: "I'll get back to you soon to confirm the details."
      });
      
      setFormData({
        subject: "",
        message: "",
        date: "",
        time: ""
      });
      setSelectedDate(undefined);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send meeting request",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Available time slots - updated for evening hours
  const timeSlots = ["05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:0 PM"];

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-2 text-center">
          <span className="gradient-text">Free Meeting</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Interested in working together or discussing problem solving? Let's schedule a time to talk!
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {!user ? (
              <Card className="p-6 flex flex-col items-center justify-center text-center">
                <LogIn className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Authentication Required</h3>
                <p className="mb-4 text-gray-600 dark:text-gray-400">
                  Please sign in to book an appointment
                </p>
                <Button asChild>
                  <Link to="/auth">Sign In / Sign Up</Link>
                </Button>
              </Card>
            ) : (
              <Card className="transform transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label htmlFor="subject" className="block text-sm font-medium">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="Meeting Request: Technical Interview Preparation"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="transition-all duration-300 focus:ring-2"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="date" className="block text-sm font-medium">
                          Preferred Date
                        </label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !selectedDate && "text-muted-foreground"
                              )}
                            >
                              <Calendar className="mr-2 h-4 w-4" />
                              {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <CalendarComponent
                              mode="single"
                              selected={selectedDate}
                              onSelect={handleDateSelect}
                              initialFocus
                              disabled={(date) => date < new Date()}
                              className="p-3 pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                        <input 
                          type="hidden" 
                          name="date" 
                          value={formData.date} 
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="startTime" className="block text-sm font-medium">
                          Preferred Start Time
                        </label>
                        <Popover open={isTimePickerOpen} onOpenChange={setIsTimePickerOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !formData.time && "text-muted-foreground"
                              )}
                            >
                              <Clock className="mr-2 h-4 w-4" />
                              {formData.time || <span>Select time</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <div className="p-3">
                              <div className="grid grid-cols-2 gap-2">
                                {timeSlots.map((time) => (
                                  <Button
                                    key={time}
                                    variant={formData.time === time ? "default" : "outline"}
                                    className="justify-start"
                                    onClick={() => handleTimeSelect(time)}
                                  >
                                    {time}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                        <input 
                          type="hidden" 
                          name="time" 
                          value={formData.time} 
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="block text-sm font-medium">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="I'd like to discuss..."
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="transition-all duration-300 focus:ring-2"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full transition-all duration-300 transform hover:scale-[1.02]" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Book an appointment"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card className="transform transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold">Email Me</h3>
                    <a href="mailto:aramadan442000@gmail.com" className="text-primary hover:underline">
                      aramadan442000@gmail.com
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="transform transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold">Availability</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Thursday - Sunday<br />
                      5:00 PM - 11:59 PM
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      <strong>Meeting Duration:</strong> 1 - 3 hours
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="transform transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold">Quick Response</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      I typically respond within 24 hours on business days.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-6 p-5 bg-gray-100 dark:bg-gray-800 rounded-lg transform transition-all duration-300 hover:shadow-lg">
              <h4 className="font-bold mb-2">Meeting Types</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                  Project Discussion
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                  Mentoring Session
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-purple-500 mr-2"></span>
                  Technical Interview Practice
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
