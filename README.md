# Remote Learning Assignments

## Week 1

### Assignment 1: Build infrastructure on Amazon Web Service (AWS)

- [Create AWS resources](https://github.com/ccy05327/remote-assignments.git)
    - EC2 (free tier plan)
        - OS Images: `Amazon Linux 2 AMI`
        - Instance type: `t2.micro`
        - Storage size: `8 GiB`
    - RDS (free tier plan)
        - Engine type: `MySQL 8.0.28`
        - Instance type: `db.t4g.micro`
        - Storage size: `20 GiB`
- [Associate Elastic IP](https://github.com/ccy05327/remote-assignments.git)
    - Associate Elastic IP with EC2 instance to avoid IP changing when instance reboot
- [Ensure RDS database connection](https://github.com/ccy05327/remote-assignments.git)
    - Try to modify `Security group` settings until we can connect database from outside


### Assignment 2: Create Github repository

1. Create a repo named `remote-assignments`
2. Create a branch named `dev`
3. Create a `README.md` with description, environment requirements, and how to use
