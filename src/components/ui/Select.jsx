import * as React from "react";
import { cn } from "../../../lib/utils";
// eslint-disable-next-line no-unused-vars
import { useMotionTemplate, useMotionValue, motion } from "motion/react";
import { IconArrowsMoveVertical } from "@tabler/icons-react";

const Select = React.forwardRef(
  (
    { className, children, placeholder = "Select an option", ...props },
    ref
  ) => {
    const radius = 100; // change this to increase the radius of the hover effect
    const [visible, setVisible] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);

    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }) {
      let { left, top } = currentTarget.getBoundingClientRect();

      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }

    return (
      <motion.div
        style={{
          background: useMotionTemplate`
          radial-gradient(
            ${
              visible ? radius + "px" : "0px"
            } circle at ${mouseX}px ${mouseY}px,
            #3b82f6,
            transparent 80%
          )
        `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="group/select relative rounded-lg p-[2px] transition duration-300"
      >
        <select
          className={cn(
            `shadow-input dark:placeholder-text-neutral-600 flex h-10 w-full rounded-md border-none bg-gray-50 px-3 py-2 pr-8 text-sm text-black transition duration-400 group-hover/select:shadow-none focus-visible:ring-[2px] focus-visible:ring-neutral-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-800 dark:text-white dark:shadow-[0px_0px_1px_1px_#404040] dark:focus-visible:ring-neutral-600 appearance-none cursor-pointer`,
            className
          )}
          ref={ref}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setIsOpen(false)}
          {...props}
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {children}
        </select>

        {/* Custom dropdown arrow */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
        >
          <IconArrowsMoveVertical className="h-4 w-4 text-neutral-400 dark:text-neutral-500" />
        </motion.div>
      </motion.div>
    );
  }
);

Select.displayName = "Select";

export { Select };
