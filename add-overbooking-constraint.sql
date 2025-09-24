-- Add unique constraint to prevent overbooking at database level
-- This ensures no two orders can have the same scheduled_date and scheduled_time
-- with status in ('pending', 'confirmed', 'in_progress')

-- First, let's create a partial unique index that only applies to active bookings
CREATE UNIQUE INDEX IF NOT EXISTS unique_active_booking_slot 
ON orders (scheduled_date, scheduled_time) 
WHERE status IN ('pending', 'confirmed', 'in_progress') 
AND scheduled_date IS NOT NULL 
AND scheduled_time IS NOT NULL;

-- Add a comment explaining the constraint
COMMENT ON INDEX unique_active_booking_slot IS 'Prevents overbooking by ensuring only one active order per time slot';

-- Optional: Create a function to check availability (can be used by applications)
CREATE OR REPLACE FUNCTION check_booking_availability(
    p_scheduled_date DATE,
    p_scheduled_time TIME
) RETURNS BOOLEAN AS $$
BEGIN
    -- Check if there are any active bookings for this date and time
    RETURN NOT EXISTS (
        SELECT 1 FROM orders 
        WHERE scheduled_date = p_scheduled_date 
        AND scheduled_time = p_scheduled_time 
        AND status IN ('pending', 'confirmed', 'in_progress')
    );
END;
$$ LANGUAGE plpgsql;

-- Add comment for the function
COMMENT ON FUNCTION check_booking_availability IS 'Returns true if the specified date and time slot is available for booking';
