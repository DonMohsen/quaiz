function ExploreDocumentsSkeleton() {
  return (
    <div className="rounded-xl border border-gray-200 shadow-sm   animate-pulse">
      {/* Thumbnail */}
      <div className="h-[200px] w-full rounded-lg bg-gray-200" />

      <div className="p-5">

      {/* name and created by */}
      <div className="h-6 w-3/4 rounded-[6px] bg-gray-200 mb-2 " />
            <div className="h-4 w-3/4 rounded-[6px] bg-gray-200 " />
      {/* desc */}
      <div className="h-10 w-full rounded-md bg-gray-200 mt-5 mb-10" />
            {/* badges */}
            <div className="flex items-center justify-start gap-5">

          <div className="h-8 w-[80px] rounded-full p-2 bg-gray-200" />
          <div className="h-8 w-[80px] rounded-full p-2 bg-gray-200" />
          
            </div>
            <div className="w-full flex items-end justify-between mt-5">
                <div className="bg-gray-200 w-[50px] rounded-[14px] h-4"></div>
                <div className="bg-gray-200 w-[120px] rounded-[10px] h-[50px]"></div>
            </div>


      </div>


    </div>
  );
}

export default ExploreDocumentsSkeleton;