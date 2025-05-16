import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, LogIn, Github, Linkedin, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Auth from "@/pages/Auth";

type UserProfile = {
  id: string;
  username: string | null;
  first_name?: string | null;
  last_name?: string | null;
  email?: string;
  avatar_url?: string | null;
  linkedin_url?: string | null;
  github_url?: string | null;
};

type ReviewType = {
  id: string;
  rating: number;
  comment: string;
  date: string;
  user: UserProfile;
  provider?: string;
};

const Feedback = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [displayedReviews, setDisplayedReviews] = useState<ReviewType[]>([]);
  const [hasSubmittedReview, setHasSubmittedReview] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const animationIntervalRef = useRef<number | null>(null);

  // Review form state with updated validation
  const reviewSchema = z.object({
    rating: z.string().min(1, {
      message: "Please select a rating.",
    }),
    comment: z.string().min(50, {
      message: "Comment must be at least 50 characters.",
    }),
  });

  const reviewForm = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: "",
      comment: "",
    },
  });

  // Set up animation for comments if there are more than 6
  useEffect(() => {
    if (reviews.length > 6) {
      // Clear any existing interval
      if (animationIntervalRef.current) {
        window.clearInterval(animationIntervalRef.current);
      }

      // Initialize with first 3 comments
      setDisplayedReviews(reviews.slice(0, 3));

      // Set up interval to rotate comments every minute
      let currentIndex = 0;
      animationIntervalRef.current = window.setInterval(() => {
        currentIndex = (currentIndex + 3) % Math.max(reviews.length - 2, 1);
        setDisplayedReviews(reviews.slice(currentIndex, currentIndex + 3));
      }, 60000); // 1 minute interval
    } else {
      // If 6 or fewer reviews, show all of them
      setDisplayedReviews(reviews);
    }

    return () => {
      // Clean up interval on unmount
      if (animationIntervalRef.current) {
        window.clearInterval(animationIntervalRef.current);
      }
    };
  }, [reviews]);

  // Fetch user profile and existing reviews
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      
      try {
        // Check if user has already submitted a review
        const { data: userReviews, error: reviewError } = await supabase
          .from('comments')
          .select('*')
          .eq('user_id', user.id);
        
        if (reviewError) throw reviewError;

        setHasSubmittedReview(userReviews && userReviews.length > 0);
        
        // Get user profile data
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (profileError && profileError.code !== 'PGRST116') throw profileError;
        
        if (profile) {
          setUserProfile({
            id: user.id,
            username: profile.username,
            email: user.email,
            first_name: profile.first_name || user.user_metadata?.first_name,
            last_name: profile.last_name || user.user_metadata?.last_name,
            avatar_url: profile.avatar_url,
            linkedin_url: profile.linkedin_url,
            github_url: profile.github_url
          });
        }
      } catch (error: any) {
        console.error('Error fetching user data:', error);
      }
    };
    
    const fetchAllReviews = async () => {
      try {
        setIsLoading(true);
        // Modified query to fetch comments and user information separately
        const { data: commentsData, error: commentsError } = await supabase
          .from('comments')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (commentsError) throw commentsError;
        
        if (commentsData && commentsData.length > 0) {
          // Get unique user IDs from comments
          const userIds = [...new Set(commentsData.map(comment => comment.user_id))];
          
          // Fetch profiles for these users
          const { data: profilesData, error: profilesError } = await supabase
            .from('profiles')
            .select('*')
            .in('id', userIds);
          
          if (profilesError) throw profilesError;
          
          // Fetch user auth data for email addresses
          const { data: authUsersData, error: authUsersError } = await supabase
            .from('auth.users')
            .select('id, email')
            .in('id', userIds);

          // Map profiles to comments
          const transformedReviews = commentsData.map(comment => {
            const userProfile = profilesData?.find(profile => profile.id === comment.user_id);
            
            // Get user auth data to determine provider and email
            const authUser = user && user.id === comment.user_id ? user : null;
            const provider = authUser?.app_metadata?.provider || 'email';
            
            return {
              id: comment.id,
              rating: comment.rating,
              comment: comment.feedback,
              date: new Date(comment.created_at || "").toISOString().split('T')[0],
              user: {
                id: comment.user_id,
                username: userProfile?.username || authUser?.email,
                first_name: userProfile?.first_name,
                last_name: userProfile?.last_name,
                email: authUser?.email || userProfile?.username,
                avatar_url: userProfile?.avatar_url,
                linkedin_url: userProfile?.linkedin_url,
                github_url: userProfile?.github_url
              },
              provider
            };
          });
          
          setReviews(transformedReviews);
        } else {
          setReviews([]);
        }
      } catch (error: any) {
        console.error('Error fetching reviews:', error);
        toast({
          title: "Error",
          description: "Failed to load feedback comments",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
    fetchAllReviews();
  }, [user, toast]);

  const onReviewSubmit = async (data: z.infer<typeof reviewSchema>) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to leave feedback",
        variant: "destructive"
      });
      return;
    }

    try {
      // Submit to Supabase using the comments table
      const { error } = await supabase.from('comments').insert({
        user_id: user.id,
        rating: parseInt(data.rating),
        feedback: data.comment
      });

      if (error) throw error;
      
      // Add new review to the list
      const newReview = {
        id: Math.random().toString(), // temporary ID until we refresh
        rating: parseInt(data.rating),
        comment: data.comment,
        date: new Date().toISOString().split('T')[0],
        user: {
          id: user.id,
          username: userProfile?.username || user.email || 'Anonymous',
          first_name: userProfile?.first_name,
          last_name: userProfile?.last_name,
          email: user.email,
          avatar_url: userProfile?.avatar_url,
          linkedin_url: userProfile?.linkedin_url,
          github_url: userProfile?.github_url
        },
        provider: user.app_metadata?.provider || 'email'
      };
      
      setReviews(prev => [newReview, ...prev]);
      setHasSubmittedReview(true);
      reviewForm.reset();
      setShowReviewForm(false);
      
      toast({
        title: "Review Submitted!",
        description: "Thank you for your feedback!"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit review",
        variant: "destructive"
      });
    }
  };

  const getFullName = (review: ReviewType) => {
    if (review.user.first_name && review.user.last_name) {
      return `${review.user.first_name} ${review.user.last_name}`;
    }
    return review.user.username || review.user.email || 'Anonymous';
  };

  const getUserInitials = (review: ReviewType) => {
    if (review.user.first_name && review.user.last_name) {
      return `${review.user.first_name[0]}${review.user.last_name[0]}`.toUpperCase();
    }
    if (review.user.username) {
      return review.user.username.substring(0, 2).toUpperCase();
    }
    if (review.user.email) {
      return review.user.email.substring(0, 2).toUpperCase();
    }
    return 'AN';
  };

  // Check if the user has at least one contact method
  const hasContactMethod = (review: ReviewType) => {
    return Boolean(review.user.email || review.user.linkedin_url || review.user.github_url);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  const starVariants = {
    hidden: { scale: 0 },
    visible: (i: number) => ({
      scale: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 200,
        damping: 10
      }
    })
  };

  const contentVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="feedback" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-2 text-center"
        >
          <span className="gradient-text">Feedback</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto"
        >
          See what others have to say about our meetings and sessions
        </motion.p>

        <div className="flex justify-center mb-8">
          {!user ? (
            <Button asChild>
              <Link to="/auth" className="flex items-center">
                <LogIn className="mr-2 h-4 w-4" /> 
                Sign in to Leave a Review
              </Link>
            </Button>
          ) : hasSubmittedReview ? (
            <div className="text-center p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
              <p>Thank you for your feedback! You can only submit one review.</p>
            </div>
          ) : (
            <Button onClick={() => setShowReviewForm(!showReviewForm)}>
              {showReviewForm ? "Cancel" : "Leave a Review"}
            </Button>
          )}
        </div>

        {showReviewForm && user && !hasSubmittedReview && (
          <Card className="mb-8 max-w-2xl mx-auto">
            <CardContent className="p-6">
              <Form {...reviewForm}>
                <form onSubmit={reviewForm.handleSubmit(onReviewSubmit)} className="space-y-6">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md mb-4">
                    <p className="font-medium">Posting as: {userProfile?.email || user?.email}</p>
                    <p className="text-sm text-gray-500">All fields marked with * are required</p>
                  </div>
                  
                  <FormField
                    control={reviewForm.control}
                    name="rating"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rating *</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a rating" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1 - Poor</SelectItem>
                              <SelectItem value="2">2 - Fair</SelectItem>
                              <SelectItem value="3">3 - Good</SelectItem>
                              <SelectItem value="4">4 - Very Good</SelectItem>
                              <SelectItem value="5">5 - Excellent</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={reviewForm.control}
                    name="comment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Review * (minimum 50 characters)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Share your experience..."
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                        <div className="text-xs text-gray-500 mt-1">
                          {field.value.length}/50 characters
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button type="submit">Submit Review</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}

        {isLoading ? (
          <div className="flex justify-center my-12">
            <div className="animate-pulse flex space-x-4">
              <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="wait">
              {displayedReviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  className="h-full"
                >
                  <Card className="overflow-hidden h-full">
                    <CardContent className="p-6">
                      <motion.div 
                        variants={contentVariants}
                        className="flex items-center mb-4"
                      >
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200, damping: 10 }}
                          className="mr-3"
                        >
                          <Avatar>
                            <AvatarImage src={review.user.avatar_url || undefined} alt={getFullName(review)} />
                            <AvatarFallback>{getUserInitials(review)}</AvatarFallback>
                          </Avatar>
                        </motion.div>
                        <div>
                          <h4 className="font-bold">{getFullName(review)}</h4>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <motion.div
                                key={i}
                                custom={i}
                                variants={starVariants}
                                initial="hidden"
                                animate="visible"
                              >
                                <Star 
                                  size={16} 
                                  className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                                />
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                      <motion.p 
                        variants={contentVariants}
                        className="text-gray-600 dark:text-gray-400 mb-4 whitespace-pre-line break-words"
                      >
                        {review.comment}
                      </motion.p>
                      <motion.div 
                        variants={contentVariants}
                        className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                      >
                        <div className="flex flex-col gap-2">
                          {review.user.email && (
                            <motion.div 
                              whileHover={{ x: 5 }}
                              className="flex items-center"
                            >
                              <Mail className="h-4 w-4 mr-2 text-gray-500" />
                              <a 
                                href={`mailto:${review.user.email}`} 
                                className="text-sm text-gray-500 hover:text-gray-700"
                              >
                                {review.user.email}
                              </a>
                            </motion.div>
                          )}
                          
                          <p className="text-xs text-gray-500 dark:text-gray-400">{review.date}</p>
                          
                          <div className="flex space-x-3 mt-1">
                            {review.user.github_url && (
                              <motion.a 
                                whileHover={{ scale: 1.1 }}
                                href={review.user.github_url}
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-gray-700"
                              >
                                <Github className="h-4 w-4" />
                              </motion.a>
                            )}
                            {review.user.linkedin_url && (
                              <motion.a 
                                whileHover={{ scale: 1.1 }}
                                href={review.user.linkedin_url}
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-gray-700"
                              >
                                <Linkedin className="h-4 w-4" />
                              </motion.a>
                            )}
                            {!hasContactMethod(review) && (
                              <span className="text-gray-400 text-xs italic">No contact info</span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
            {reviews.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-1 md:col-span-2 lg:col-span-3 text-center p-8 bg-gray-100 dark:bg-gray-800 rounded-lg"
              >
                <p>No feedback comments yet. Be the first to leave a review!</p>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Feedback;
