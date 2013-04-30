UPDATE recv SET recv_recvcost = recv_value / recv_qty WHERE recv_recvcost IS NULL AND (COALESCE(recv_qty, 0) <> 0);
