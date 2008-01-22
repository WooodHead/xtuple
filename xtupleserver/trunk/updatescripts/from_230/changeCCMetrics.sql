SELECT setMetric('CCConfirmPreauth', 
		 CASE WHEN fetchMetricText('CCConfirmTrans') = 'A' THEN 't'
		      WHEN fetchMetricText('CCConfirmTrans') = 'B' THEN 't'
		      ELSE 'f'
		 END),
       setMetric('CCConfirmCharge', 
		 CASE WHEN fetchMetricText('CCConfirmTrans') = 'C' THEN 't'
		      WHEN fetchMetricText('CCConfirmTrans') = 'B' THEN 't'
		      ELSE 'f'
		 END),
       setMetric('CCConfirmChargePreauth', 
		 CASE WHEN fetchMetricText('CCConfirmTrans') = 'C' THEN 't'
		      WHEN fetchMetricText('CCConfirmTrans') = 'B' THEN 't'
		      ELSE 'f'
		 END),
       setMetric('CCConfirmCredit', 
		 CASE WHEN fetchMetricText('CCConfirmTrans') = 'B' THEN 't'
		      ELSE 'f'
		 END),

       setMetric('CCEnablePreauth',
		 CASE WHEN fetchMetricText('CCSoOptions') = 'A' THEN 't'
		      WHEN fetchMetricText('CCSoOptions') = 'B' THEN 't'
		      ELSE 'f'
		 END),
       setMetric('CCEnableCharge', 
		 CASE WHEN fetchMetricText('CCSoOptions') = 'C' THEN 't'
		      WHEN fetchMetricText('CCSoOptions') = 'B' THEN 't'
		      ELSE 'f'
		 END),

       setMetric('CCAvsCheck', 
		 CASE WHEN fetchMetricText('CCSoOptions') = 'X' THEN 'X'
		      WHEN fetchMetricText('CCSoOptions') = 'F' THEN 'F'
		      ELSE 'W'
		 END),

       setMetric('CCTestResult', 
		 CASE WHEN fetchMetricText('CCYPTestResult') = 'D' THEN 'F'
		      WHEN fetchMetricText('CCYPTestResult') = 'X' THEN 'F'
		      ELSE 'P'
		 END)

       ;
			 
DELETE FROM metric WHERE metric_name IN ('CCConfirmTrans',
					 'CCSoOptions',
					 'CCYPTestResult'
					 );
