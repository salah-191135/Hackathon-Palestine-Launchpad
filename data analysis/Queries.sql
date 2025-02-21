
--#############################################################################################

--Number Of Users Per Courses , Sorting By Largest Number Of User Per Course Desc .
SELECT
    COUNT(userid_di),
    course_id
FROM
    dataset
GROUP BY
    course_id
    order by COUNT(userid_di) desc;

--#############################################################################################

--Number Of Passes And Fails Per Courses , If Grater Than .5 Then Pass Else Fail  , Sorting By Number Of Passes And Fails Per Courses Desc.

SELECT
    course_id,
    COUNT(CASE WHEN TO_NUMBER(NVL(TRIM(grade), '0')) > 0.5 THEN 1 END) AS pass,
    COUNT(CASE WHEN TO_NUMBER(NVL(TRIM(grade), '0')) <= 0.5 THEN 1 END) AS fail
FROM
    dataset
GROUP BY
    course_id
    order by 2 desc;
	
--#############################################################################################

--Number Of Number Of Play Videos Per Course , Sorting By Number Of Number Of Play Videos Per Course Desc.
	
SELECT
    --COUNT(1),
    COUNT(CASE WHEN  NPLAY_VIDEO IS NULL THEN NULL ELSE NPLAY_VIDEO END ) AS NUM_oF_PLAYVIDEO,
    COURSE_ID
FROM
    dataset
GROUP BY
--NPLAY_VIDEO
    COURSE_ID
    order by 1 desc;

--#############################################################################################

-- Number Of Passes or Fails Per (YEAR,MONTH) And Course . 

SELECT
    to_char(TO_DATE(TRIM(start_time_di),'MM/DD/YYYY'),'YYYY-MM') AS STATRING_DATE,
    course_id,
    COUNT(1)AS TOTAL,
    COUNT(CASE WHEN TO_NUMBER(NVL(TRIM(grade), '0')) > 0.5 THEN 1 END) AS pass,
    COUNT(CASE WHEN TO_NUMBER(NVL(TRIM(grade), '0')) <= 0.5 THEN 1 END) AS fail
FROM
    dataset
GROUP BY
    to_char(TO_DATE(TRIM(start_time_di),'MM/DD/YYYY'),'YYYY-MM'),
    course_id;

--#############################################################################################

--Query To Illsatrate the Number Of Users Per Level Of Eduation And If Certifed And Courses .  
	
SELECT LOE_DI,certified,COURSE_ID,COUNT(1) FROM dataset
GROUP BY LOE_DI,certified,COURSE_ID
ORDER BY 1;

--#############################################################################################


WITH CourseRegistrations AS (
    SELECT 
        loe_di, 
        course_id, 
        SUM(registered) AS total_registered
    FROM dataset
    GROUP BY loe_di, course_id
),
RankedCourses AS (
    SELECT 
        loe_di, 
        course_id, 
        total_registered,
        RANK() OVER (PARTITION BY loe_di ORDER BY total_registered DESC) AS rnk
    FROM CourseRegistrations
)
SELECT loe_di, course_id, total_registered
FROM RankedCourses
WHERE rnk = 1
order by 3 desc;

--#############################################################################################


SELECT
    gender,
    CASE WHEN  TO_NUMBER(to_char(sysdate, 'YYYY')) - TO_NUMBER(nvl(TRIM(yob),2025)) BETWEEN 0 AND 30 THEN '0-30'
    WHEN TO_NUMBER(to_char(sysdate, 'YYYY')) - TO_NUMBER(nvl(TRIM(yob),2025)) BETWEEN 31 AND 40 THEN '31-40'
    WHEN TO_NUMBER(to_char(sysdate, 'YYYY')) - TO_NUMBER(nvl(TRIM(yob),2025)) BETWEEN 41 AND 50 THEN '41-50'
    WHEN TO_NUMBER(to_char(sysdate, 'YYYY')) - TO_NUMBER(nvl(TRIM(yob),2025))>=51 THEN '41-50'
    END AS age,loe_di,certified,
    COUNT(1)
FROM
    dataset
    WHERE ( (GENDER IS NOT NULL ) AND (LOE_DI IS NOT NULL) AND (GENDER <> 'NA') AND (LOE_DI <> 'NA')   )
GROUP BY
    gender,CASE WHEN  TO_NUMBER(to_char(sysdate, 'YYYY')) - TO_NUMBER(nvl(TRIM(yob),2025)) BETWEEN 0 AND 30 THEN '0-30'
    WHEN TO_NUMBER(to_char(sysdate, 'YYYY')) - TO_NUMBER(nvl(TRIM(yob),2025)) BETWEEN 31 AND 40 THEN '31-40'
    WHEN TO_NUMBER(to_char(sysdate, 'YYYY')) - TO_NUMBER(nvl(TRIM(yob),2025)) BETWEEN 41 AND 50 THEN '41-50'
    WHEN TO_NUMBER(to_char(sysdate, 'YYYY')) - TO_NUMBER(nvl(TRIM(yob),2025))>=51 THEN '41-50' END,loe_di,certified
    ORDER BY 1,2,3 DESC;


--#############################################################################################

SELECT
    final_cc_cname_di,
    course_id,
    COUNT(1)
FROM
    dataset
GROUP BY
    final_cc_cname_di,
    course_id
ORDER BY
    3 DESC;