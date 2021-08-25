CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `ticket_details` AS
    SELECT 
        `t`.`id` AS `ticket_id`,
        `c`.`username` AS `customer_username`,
        `d`.`name` AS `department`,
        `ic`.`name` AS `issue_category`,
        `a`.`username` AS `agent_username`,
        `s`.`name` AS `status`,
        `pl`.`name` AS `priority_level`,
        `ch`.`name` AS `channel`,
        `t`.`created_at` AS `created_at`
    FROM
        (((((((`ticket` `t`
        JOIN `customer` `c` ON ((`t`.`customer_id` = `c`.`id`)))
        JOIN `department` `d` ON ((`t`.`department_id` = `d`.`id`)))
        LEFT JOIN `issue_category` `ic` ON ((`t`.`category_id` = `ic`.`id`)))
        LEFT JOIN `agent` `a` ON ((`t`.`current_agent_id` = `a`.`id`)))
        LEFT JOIN `status` `s` ON ((`t`.`status_id` = `s`.`id`)))
        JOIN `priority_level` `pl` ON ((`t`.`priority_level_id` = `pl`.`id`)))
        JOIN `channel` `ch` ON ((`t`.`channel_id` = `ch`.`id`)))
    ORDER BY `t`.`created_at` DESC