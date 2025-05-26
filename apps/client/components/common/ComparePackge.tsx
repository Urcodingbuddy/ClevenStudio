// import React from 'react';
// import { Check, GalleryHorizontal } from 'lucide-react';
// import { cn } from '@repo/lib/utils';
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogTrigger,
// // } from "./dialog";
// import { Button } from "./button";
// import { packages } from './ServiceCard';

// interface ComparePackagesDialogProps {
//   buttonStyle?: 'outline' | 'primary';
// }

// // const ComparePackagesDialog: React.FC<ComparePackagesDialogProps> = ({ buttonStyle = 'outline' }) => {
// //   return (
// //     <Dialog>
// //       <DialogTrigger asChild>
// //         {buttonStyle === 'primary' ? (
// //           <button className="w-full py-2 px-4 font-medium rounded-lg flex items-center justify-center bg-white text-black ">
// //             View plans
// //           </button>
// //         ) : (
// //           <Button variant="outline" className="flex items-center gap-2">
// //             <div className="relative bg-gray-800 rounded p-1 mr-1">
// //               <GalleryHorizontal className="h-4 w-4 text-gray-200" />
// //             </div>
// //             Compare All Packages
// //           </Button>
// //         )}
// //       </DialogTrigger>

// //       <DialogContent
// //         className={cn(
// //           "z-50 max-w-6xl w-full rounded-xl border border-gray-700 bg-[#09090b] p-6",
// //           "data-[state=open]:animate-in data-[state=closed]:animate-out",
// //           "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
// //           "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
// //           "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
// //           "data-[state=open]:slide-in-from-right-1/2 data-[state=open]:slide-in-from-top-[48%]"
// //         )}
// //       >
// //         <div className="w-full max-w-6xl p-6">
// //           <h3 className="text-2xl font-bold text-center mb-6 text-gray-100">
// //             Compare SEO Packages
// //           </h3>

// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //             {packages.map((pkg, index) => (
// //               <div
// //                 key={index}
// //                 className={cn(
// //                   "flex flex-col justify-between rounded-xl bg-[#09090b] shadow-md transition-all hover:shadow-lg",
// //                   pkg.popularChoice
// //                     ? "ring-2 ring-agency-purple/20"
// //                     : "border border-gray-700"
// //                 )}
// //               >
// //                 {pkg.popularChoice && (
// //                   <div className="bg-red-400 text-white text-xs font-medium py-1 text-center">
// //                     MOST POPULAR
// //                   </div>
// //                 )}

// //                 <div className="p-6">
// //                   <h4 className="text-xl font-bold text-center mb-2 text-gray-100">{pkg.name}</h4>
// //                   <div className="text-center mb-4">
// //                     <span className="text-3xl font-bold text-gray-100">{pkg.price}</span>
// //                     <span className="text-gray-400 text-sm">{pkg.period}</span>
// //                   </div>

// //                   <div className="space-y-3 mt-6">
// //                     {pkg.features.map((feature, idx) => (
// //                       <div key={idx} className="flex items-center">
// //                         {feature.included ? (
// //                           <Check className="h-4 w-4 text-agency-blue mr-3 flex-shrink-0" />
// //                         ) : (
// //                           <div className="h-4 w-4 rounded-full border border-gray-600 mr-3 flex-shrink-0" />
// //                         )}
// //                         <span className={cn(
// //                           "text-sm",
// //                           feature.included ? "text-gray-200" : "text-gray-500"
// //                         )}>
// //                           {feature.name}
// //                         </span>
// //                       </div>
// //                     ))}
// //                   </div>

// //                   <button className={cn(
// //                     "w-full mt-6 py-3 px-4 font-medium rounded-lg transition-colors duration-200 shadow-sm",
// //                     "bg-white hover:bg-red-600 text-black"
// //                   )}>
// //                     {pkg.buttonText}
// //                   </button>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </DialogContent>
// //     </Dialog>
// //   );
// // };

// // export default ComparePackagesDialog;
