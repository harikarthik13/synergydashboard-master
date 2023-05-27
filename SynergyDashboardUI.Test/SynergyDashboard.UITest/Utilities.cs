#region Name Space
using System;
#endregion

namespace SynergyDashboard.Test
{
    public static class Utilities
    {
        #region Helper Methods
        /// <summary>
        /// Checks for DBNull and returns the string value or string.Empty
        /// </summary>
        /// <param name="obj">Gets the object</param>
        /// <returns></returns>
        public static string GetDBString(object obj)
        {
            if (!(obj is DBNull) && obj != null)
            {
                return Convert.ToString(obj);
            }
            else
            {
                return string.Empty;
            }
        }

        /// <summary>
        /// Cast the string to boolean type.
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public static bool CastToBoolean(string value)
        {
            switch (value.ToLower())
            {
                case "true":
                    return true;
                case "t":
                    return true;
                case "1":
                    return true;
                case "0":
                    return false;
                case "false":
                    return false;
                case "f":
                    return false;
                default:
                    return false;
            }
        }

        /// <summary>
        /// Cast the object to boolean type
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public static bool GetDBBool(object obj)
        {
            if (!(obj is DBNull) && obj != null)
            {
                if (Convert.ToInt32(obj) == 1)
                {
                    return true;
                }
                else
                {
                    return false;
                }

            }
            else
            {
                return false;
            }
        }
        #endregion
    }
}
