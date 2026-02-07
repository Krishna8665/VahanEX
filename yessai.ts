      {/* Update Schedule Dialog */}
      <Dialog open={updateDialogOpen} onOpenChange={setUpdateDialogOpen}>
        <DialogContent className="w-full max-w-2xl max-h-screen overflow-y-auto p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl sm:text-3xl font-bold">
              Update Schedule Time
            </DialogTitle>
          </DialogHeader>

          {scheduleToUpdate && (
            <form onSubmit={handleUpdateSubmit} className="space-y-6 py-4">
              {/* Date Display (Read-only) */}
              <div className="space-y-2 pb-4 border-b">
                <Label className="text-sm font-semibold text-muted-foreground">
                  Schedule Date
                </Label>
                <div className="h-12 w-full border border-input rounded-lg px-4 py-2 flex items-center justify-center bg-gradient-to-r from-teal-50 to-teal-100 dark:from-teal-950/30 dark:to-teal-900/30">
                  <span className="font-semibold text-base">
                    {new Date(scheduleToUpdate.scheduleDate).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      },
                    )}
                  </span>
                </div>
              </div>

              {/* Times Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative">
                {/* Start Time */}
                <div className="space-y-2">
                  <Label className="text-sm sm:text-base font-semibold">
                    Start Time *
                  </Label>
                  <div className="relative">
                    <CustomTimePicker
                      value={updateFormData.startTime}
                      onChange={(time) =>
                        setUpdateFormData((prev) => ({
                          ...prev,
                          startTime: time,
                        }))
                      }
                      isOpen={openUpdateStartTime}
                      setIsOpen={setOpenUpdateStartTime}
                    />
                  </div>
                  {formErrors.startTime && (
                    <p className="text-xs text-red-500">
                      {formErrors.startTime}
                    </p>
                  )}
                </div>

                {/* End Time */}
                <div className="space-y-2">
                  <Label className="text-sm sm:text-base font-semibold">
                    End Time *
                  </Label>
                  <div className="relative">
                    <CustomTimePicker
                      value={updateFormData.endTime}
                      onChange={(time) =>
                        setUpdateFormData((prev) => ({
                          ...prev,
                          endTime: time,
                        }))
                      }
                      isOpen={openUpdateEndTime}
                      setIsOpen={setOpenUpdateEndTime}
                      minTime={updateFormData.startTime}
                    />
                  </div>
                  {formErrors.endTime && (
                    <p className="text-xs text-red-500">{formErrors.endTime}</p>
                  )}
                </div>
              </div>

              {/* Dialog Footer */}
              <DialogFooter className="gap-3 pt-4 flex-col-reverse sm:flex-row">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setUpdateDialogOpen(false);
                    resetUpdateForm();
                  }}
                  disabled={formLoading}
                  className="h-11 px-6 text-base w-full sm:w-auto"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="h-11 px-8 text-base bg-teal-600 hover:bg-teal-700 text-white w-full sm:w-auto"
                  disabled={formLoading}
                >
                  {formLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update Schedule"
                  )}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="w-full max-w-sm">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              Delete Schedule
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this schedule? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
            <AlertDialogCancel className="h-11 px-6">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleteLoading}
              className="h-11 px-6 bg-red-600 hover:bg-red-700 text-white"
            >
              {deleteLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>




       <div className="flex items-center gap-2">
          <label
            htmlFor="dateFilter"
            className="text-sm font-medium whitespace-nowrap"
          >
            Date:
          </label>
          <Input
            id="dateFilter"
            type="date"
            value={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value);
              setCurrentPage(1);
            }}
            className="h-11 w-40 text-sm"
          />
        </div>
      </div>

                  {/* Date, Start Time, End Time - Responsive & Styled Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6">
              {/* Date */}
              <div className="space-y-2">
                <Label className="text-sm sm:text-base font-semibold flex items-center gap-1.5">
                  Date <span className="text-red-500 text-base">*</span>
                </Label>
                <div className="relative">
                  <CustomDatePicker
                    value={createFormData.scheduleDate}
                    onChange={(date) =>
                      setCreateFormData((prev) => ({
                        ...prev,
                        scheduleDate: date,
                      }))
                    }
                    isOpen={openCreateDate}
                    setIsOpen={setOpenCreateDate}
                  />
                </div>
                {formErrors.scheduleDate && (
                  <p className="text-xs text-red-500 mt-1.5">
                    {formErrors.scheduleDate}
                  </p>
                )}
              </div>

              {/* Start Time - Teal style */}
              <div className="space-y-2">
                <Label className="text-sm sm:text-base font-semibold flex items-center gap-1.5">
                  Start Time <span className="text-red-500 text-base">*</span>
                </Label>
                <CustomTimePicker
                  value={createFormData.startTime}
                  onChange={(time) =>
                    setCreateFormData((prev) => ({ ...prev, startTime: time }))
                  }
                  isOpen={openCreateStartTime}
                  setIsOpen={setOpenCreateStartTime}
                  minTime={
                    createFormData.scheduleDate === minDate
                      ? getMinTime()
                      : undefined
                  }
                  variant="teal" // ← teal theme
                />
                {formErrors.startTime && (
                  <p className="text-xs text-red-500 mt-1.5">
                    {formErrors.startTime}
                  </p>
                )}
              </div>

              {/* End Time - Purple style */}
              <div className="space-y-2">
                <Label className="text-sm sm:text-base font-semibold flex items-center gap-1.5">
                  End Time <span className="text-red-500 text-base">*</span>
                </Label>
                <CustomTimePicker
                  value={createFormData.endTime}
                  onChange={(time) =>
                    setCreateFormData((prev) => ({ ...prev, endTime: time }))
                  }
                  isOpen={openCreateEndTime}
                  setIsOpen={setOpenCreateEndTime}
                  minTime={createFormData.startTime || "00:00"}
                  variant="purple" // ← purple theme
                />
                {formErrors.endTime && (
                  <p className="text-xs text-red-500 mt-1.5">
                    {formErrors.endTime}
                  </p>
                )}
              </div>
            </div>



<form class="max-w-[16rem] mx-auto grid grid-cols-2 gap-4">
    <div>
        <label for="start-time" class="block mb-2 text-sm font-medium text-heading">Start time:</label>
        <div class="relative">
            <div class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
               <svg class="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
            </div>
            <input type="time" id="start-time" class="block w-full p-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body" min="09:00" max="18:00" value="00:00" required />
        </div>
    </div>
    <div>
        <label for="end-time" class="block mb-2 text-sm font-medium text-heading">End time:</label>
        <div class="relative">
            <div class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
               <svg class="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
            </div>
            <input type="time" id="end-time" class="block w-full p-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body" min="09:00" max="18:00" value="00:00" required />
        </div>
    </div>
</form>
